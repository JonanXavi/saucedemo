import { type Locator, type Page } from "@playwright/test";

export class MenuPage {
    readonly page: Page;
    readonly signupOption: Locator;
    readonly checkoutOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupOption = page.getByRole("link", { name: "Sign up" });
        this.checkoutOption = page.getByRole('link', { name: 'Check Out' });
    }

    async clickSignupOption() {
        await this.signupOption.click();
    }

    async clickCheckOutOption() {
        await this.checkoutOption.click();
    }
}