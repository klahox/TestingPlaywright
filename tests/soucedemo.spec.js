import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CheckoutPage } from './pages/checkout.page';
import { userData,productData, checkoutData } from './data/test-data';

test.describe('SauceDemo E2E Tests', () => {
    let loginPage;
    let inventoryPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('Complete purchase flow with all items', async ({ page }) => {
        // Login
        await loginPage.goto();
        await loginPage.login(userData.username, userData.password);
        expect(await inventoryPage.verifyUrl()).toBeTruthy();

        // Verify and add all products to cart
        const inventoryProducts = await inventoryPage.getProductDetails();
        for (const product of inventoryProducts) {
            expect(productData[product.name]).toBe(product.price);
        }
        await inventoryPage.addAllItemsToCart();
        await inventoryPage.goToCart();
        
        // Verify cart products
        const cartProducts = await inventoryPage.getProductDetails();
        expect(cartProducts).toHaveLength(inventoryProducts.length);
        for (const product of cartProducts) {
            expect(productData[product.name]).toBe(product.price);
        }
        await checkoutPage.goToCheckout();
        
        // Complete checkout
        await checkoutPage.fillShippingInfo(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );

        // Verify checkout products and complete order
        const checkoutProducts = await checkoutPage.getProductDetails();
        expect(checkoutProducts).toHaveLength(inventoryProducts.length);
        for (const product of checkoutProducts) {
            expect(productData[product.name]).toBe(product.price);
        }

        await checkoutPage.finishCheckout();
        expect(await checkoutPage.isOrderComplete()).toBeTruthy();
    });
});
