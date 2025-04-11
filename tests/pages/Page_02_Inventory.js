export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('//div[@data-test="inventory-item"]');
        this.cartLink = page.locator('//a[@data-test="shopping-cart-link"]');
    }

    async verifyUrl(url) {
        return this.page.url().includes(url);
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

    async addAllItemsToCart() {
        const count = await this.inventoryItems.count();
        for (let i = 0; i < count; i++) {
            await this.inventoryItems.nth(i).locator('//button').click();
        }
    }

    async goToCart() {
        await this.cartLink.click();
    }
}
