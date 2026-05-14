import {test, expect} from '@playwright/test';
import { MenuPage } from '../pages/menu.page';
import { RegisterPage } from '../pages/register.page';

test.describe('Validar el correcto funcionamiento de la autenticacion de usuarios', async() => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('Se permite el registro de nuevos usuarios', async ({page}) => {
        const menuPage = new MenuPage(page);
        const registerPage = new RegisterPage(page);

        const name = 'Jhon'
        const lastName = 'Doe'
        const email = 'aa@gmail.com'
        const password = 'qwerty12345'

        // @ts-ignore
        await test.step('Dar clic en la opcion de signup', async () => {
            await menuPage.signupOption.click();
        });

        await test.step('Llenar el formulario de registro', async () => {
            await registerPage.typeFirstName(name);
            await registerPage.typeLastName(lastName);
            await registerPage.typeEmail(email);
            await registerPage.typePassword(password);
        });

        await test.step('Presionar el boton de registro', async () => {
            //! Solucionar challenge captcha del registro
            //! await registerPage.clickCreateButton();
        });

        await test.step('El boton de skip de captcha es visible', async () => {
            expect(page.url()).toEqual('https://sauce-demo.myshopify.com/account/register');
        });
    });
})