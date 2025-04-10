export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('id=first-name');
        this.lastNameInput = page.locator('id=last-name');
        this.postalCodeInput = page.locator('id=postal-code');
        this.continueButton = page.locator('id=continue');
        this.finishButton = page.locator('id=finish');
        this.completeText = page.locator('//div[@data-test="complete-text"]');
        this.inventoryItems = page.locator('//div[@data-test="inventory-item"]');
        this.checkoutButton = page.locator('id=checkout');
    }

    async fillShippingInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async isOrderComplete() {
        return this.completeText.isVisible();
    }

    async getProductDetails() {
        const items = [];
        const count = await this.inventoryItems.count();
        
        for (let i = 0; i < count; i++) {
            const name = await this.inventoryItems.nth(i).locator('//div[@data-test="inventory-item-name"]').innerText();
            const price = parseFloat((await this.inventoryItems.nth(i).locator('//div[@data-test="inventory-item-price"]').innerText()).replace('$', ''));
            items.push({ name, price });
        }
        return items;
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    
    }
}
