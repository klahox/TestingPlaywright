import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/Page_01_Login';
import { InventoryPage } from './pages/Page_02_Inventory';
import { CartPage } from './pages/Page_03_Cart';
import { CheckoutStepOnePage } from './pages/Page_04_CheckoutStepOne';
import { CheckoutStepTwoPage } from './pages/Page_05_CheckoutStepTwo';
import { CheckoutCompletePage } from './pages/Page_06_CheckoutComplete';
import {pagesUrl, productData,userData, checkoutData,  } from './data/test-data';

test.describe('SauceDemo E2E Tests', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutStepOnePage;
    let checkoutStepTwoPage;
    let checkoutCompletePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);
    
    });

    test('Complete purchase flow with all items', async ({ page }) => {
        // Login
        await loginPage.goto();
        await loginPage.fillLoginUserPass(userData.username, userData.password);
        await loginPage.doLogin();
        
        // Verify and add all products to cart
        expect(await inventoryPage.verifyUrl(pagesUrl.inventory),'Expected invetory url').toBeTruthy();
        expect(await inventoryPage.checkProductDetails(productData),'Expected all right values for the item Name and prices').toBeTruthy();
        await inventoryPage.addAllItemsToCart();
        await inventoryPage.goToCart();
        
        // Verify cart products
        expect(await cartPage.verifyUrl(pagesUrl.cart)).toBeTruthy();
        await cartPage.checkProductDetails(productData);
        await cartPage.goToCheckout();
        
        // Checkout Step One
        expect(await checkoutStepOnePage.verifyUrl(pagesUrl.checkoutStepOne),'Expected checkout step one url').toBeTruthy();
        await checkoutStepOnePage.fillShippingInfo(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );
        await checkoutStepOnePage.continueCheckout();

        // Checkout Step Two
        expect(await checkoutStepTwoPage.verifyUrl(pagesUrl.checkoutStepTwo)).toBeTruthy();
        expect(await checkoutStepTwoPage.checkProductDetails(productData),'Expected all right values for the item Name and prices').toBeTruthy();
        await checkoutStepTwoPage.finishCheckout();

        // Checkout Complete
        expect(await checkoutCompletePage.verifyUrl(pagesUrl.checkoutComplete)).toBeTruthy();
        expect(await checkoutCompletePage.isOrderComplete()).toBeTruthy();
    });
});
