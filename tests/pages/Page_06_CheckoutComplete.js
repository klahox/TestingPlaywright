export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;

        this.completeText = page.locator('//div[@data-test="complete-text"]');

    }

    async isOrderComplete() {
        return this.completeText.isVisible();
    }

    async verifyUrl(url) {
        return this.page.url().includes(url);
    }
}