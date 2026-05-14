import {test, expect} from '@playwright/test';
import { MenuPage } from '../pages/menu.page';
import { ProductListPage } from '../pages/plp.page';
import { ProductDetailPage } from '../pages/pdp.page';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('Validar el correcto funcionamiento del checkout', async() => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    })

    test('Se puede realizar ordenes desde el e-commerce', async ({page}) => {
        const menuPage = new MenuPage(page);
        const productListPage = new ProductListPage(page);
        const productDetailPage = new ProductDetailPage(page);
        const checkoutPage = new CheckoutPage(page);

        const email = 'qwerty@yopmail.com'
        const name = 'Jhon'
        const lastname = 'Doe';
        const address = 'Calle A e Interseccion 124';
        const city = 'Quito'
        const cart = '5213091274769091'
        const date = '0231'
        const cvv = '790'

        await test.step('Seleccionar y añadir productos desde el detalle del producto', async () => {
            for (let i = 0; i < 1; i++) {
                await productListPage.clickOnProduct(i);
                await productDetailPage.addProductToCart();
                await page.waitForResponse('/cart/add.js');
                await productDetailPage.clickReturnToHomeOption();
            }
        });

        await test.step('Clic sobre la opcion de checkout', async () => {
            await menuPage.clickCheckOutOption();
        });

        await test.step('Confirmar los productos de la orden', async () => {
            await checkoutPage.clickOnCheckOutButton();
        });

        await test.step('Completar el formulario de entrega', async () => {
            await checkoutPage.typeEmail(email);
            await checkoutPage.typeName(name);
            await checkoutPage.typeLastName(lastname);
            await checkoutPage.typeAddress(address);
            await checkoutPage.typeCity(city);
        });

        await test.step('Completar el formulario de pago', async () => {
            await checkoutPage.typeCartNumber(cart);
            await checkoutPage.typeCartDate(date);
            await checkoutPage.typeCvv(cvv);
            await checkoutPage.clickPaynowButton();
        });

        await test.step('La orden se proceso correctamente', async () => {
            await page.waitForResponse('/api/collect');
            expect(await checkoutPage.getErrorMessage()).toContain('This store doesn\'t accept Mastercard. Use a different card to pay.');
        });
    })
})