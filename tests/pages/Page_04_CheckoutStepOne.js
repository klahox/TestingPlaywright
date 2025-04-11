export class CheckoutStepOnePage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('id=first-name');
        this.lastNameInput = page.locator('id=last-name');
        this.postalCodeInput = page.locator('id=postal-code');
        this.continueButton = page.locator('id=continue');
    }

    async fillShippingInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async verifyUrl(url) {
        console.log('Current Url => ',this.page.url());
        console.log('Expected Include this Url => ',url);

        return this.page.url().includes(url);
    }


}
