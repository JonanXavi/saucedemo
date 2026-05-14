import { type Locator, type Page } from "@playwright/test";

export class ProductListPage {
    readonly page: Page;
    readonly product: Locator;
    readonly cartCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.product = page.locator('img[class="product"]');
        this.cartCount = page.locator('span[id="cart-target-desktop"]');
    }

    async clickOnProduct(product: number) {
        await this.product.nth(product).click();
    }

    async numberOfProductsOnCart(product: number) {
        return await this.product.count();
    }
}