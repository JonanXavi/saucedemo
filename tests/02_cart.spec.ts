import {test, expect} from '@playwright/test';
import { ProductListPage } from '../pages/plp.page';
import { ProductDetailPage } from '../pages/pdp.page';

test.describe('Validar el correcto funcionamiento del carrito', async() => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    })

    test('Se puede añadir productos al carrito', async ({page}) => {
        const productListPage = new ProductListPage(page);
        const productDetailPage = new ProductDetailPage(page);

        const products = await productListPage.product.count();

        await test.step('Seleccionar y añadir productos desde el detalle del producto', async () => {
            for (let i = 0; i < products; i++) {
                await productListPage.clickOnProduct(i);
                await productDetailPage.addProductToCart();
                await page.waitForResponse('/cart/add.js');
                await productDetailPage.clickReturnToHomeOption();
            }
        });

        await test.step('El numero de productos añadidos es el correcto', async () => {
            // @ts-ignore
            await expect(productListPage.cartCount).toContainText(String(products));
        });
    })
})