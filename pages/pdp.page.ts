import { type Locator, type Page } from "@playwright/test";

export class ProductDetailPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly returnToHomeOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.returnToHomeOption = page.locator('#main-menu').getByRole('link', { name: 'Home' });
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

    async clickReturnToHomeOption() {
        await this.returnToHomeOption.click();
    }
}