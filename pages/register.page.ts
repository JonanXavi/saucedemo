import { type Locator, type Page } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly createButton: Locator;
    readonly noRobotButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('input[name="customer[first_name]"]');
        this.lastNameInput = page.locator('input[name="customer[last_name]"]');
        this.emailInput = page.locator('input[name="customer[email]"]');
        this.passwordInput = page.locator('input[name="customer[password]"]');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.noRobotButton = page.locator('[data-testid="authorize-iframe"]').contentFrame().getByRole('button', { name: 'Confirm it’s you' });
    }

    async typeFirstName(name: string) {
        await this.firstNameInput.fill(name);
    }

    async typeLastName(lastname: string) {
        await this.lastNameInput.fill(lastname);
    }

    async typeEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async typePassword(email: string) {
        await this.passwordInput.fill(email);
    }

    async clickCreateButton(){
        await this.createButton.click();
    }
}