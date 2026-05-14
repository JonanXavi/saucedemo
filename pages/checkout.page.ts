import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly cartInput: Locator;
    readonly cartDateInput: Locator;
    readonly cvvInput: Locator;
    readonly paynowButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Check Out' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.nameInput = page.getByRole('textbox', { name: 'First name (optional)' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.addressInput = page.getByRole('textbox', { name: 'Address' });
        this.cityInput = page.getByRole('textbox', { name: 'City' });
        this.cartInput = page.locator('iframe[name*="card-fields-number"]').contentFrame().getByRole('textbox', { name: 'Card number' });
        this.cartDateInput = page.locator('iframe[name*="card-fields-expiry"]').contentFrame().getByRole('textbox', { name: 'Expiration date (MM / YY)' });
        this.cvvInput = page.locator('iframe[name*="card-fields-verification_value"]').contentFrame().getByRole('textbox', { name: 'Security code' });
        this.paynowButton = page.getByRole('button', { name: 'Pay now' });
        this.errorMessage = page.locator('#PaymentErrorBanner');
    }

    async clickOnCheckOutButton() {
        await this.checkoutButton.click();
    }

    async typeEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async typeName(name: string) {
        await this.nameInput.fill(name);
    }

    async typeLastName(lastname: string) {
        await this.lastNameInput.fill(lastname);
    }

    async typeAddress(address: string) {
        await this.addressInput.fill(address);
    }

    async typeCity(city: string) {
        await this.cityInput.fill(city);
    }

    async typeCartNumber(cart: string) {
        await this.cartInput.fill(cart);
    }

    async typeCartDate(cartDate: string) {
        await this.cartDateInput.fill(cartDate);
    }

    async typeCvv(cvv: string) {
        await this.cvvInput.fill(cvv);
    }

    async clickPaynowButton() {
        await this.paynowButton.click();
    }

    async getErrorMessage(){
        return this.errorMessage.allTextContents();
    }
}