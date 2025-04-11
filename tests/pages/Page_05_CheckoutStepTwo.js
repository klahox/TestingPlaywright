export class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.finishButton = page.locator('id=finish');
        this.completeText = page.locator('//div[@data-test="complete-text"]');
        this.inventoryItems = page.locator('//div[@data-test="inventory-item"]');
        this.checkoutButton = page.locator('id=checkout');
    }

    async checkProductDetails(productData) {
        const count = await this.inventoryItems.count();
        
        for (let i = 0; i < count; i++) {
            const name = await this.inventoryItems.nth(i).locator('//div[@data-test="inventory-item-name"]').innerText();
            const price = parseFloat((await this.inventoryItems.nth(i).locator('//div[@data-test="inventory-item-price"]').innerText()).replace('$', ''));
            if(productData[name]!= price)
                return false;
        }
        return true;

    }

    async finishCheckout() {
        await this.finishButton.click();
    }
    async verifyUrl(url) {
        return this.page.url().includes(url);
    }

}