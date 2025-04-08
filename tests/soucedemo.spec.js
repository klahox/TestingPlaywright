import { test, expect } from '@playwright/test';
import { assert } from 'console';
const expectedNamePrice = new Map([
    ['Sauce Labs Backpack', 29.99],
    ['Sauce Labs Bike Light', 9.99],
    ['Sauce Labs Bolt T-Shirt', 15.99],
    ['Sauce Labs Fleece Jacket', 49.99],
    ['Sauce Labs Onesie', 7.99],
    ['Test.allTheThings() T-Shirt (Red)', 15.99]
  ]);

test('SauceDemo E2E Test', async ({ page }) => {


  await page.goto('https://www.saucedemo.com/');
  console.log('Login Page =================> ');
  // Login 
  await page.locator('id=user-name').fill('standard_user');
  await page.locator('id=password').fill('secret_sauce');
  await page.locator('id=login-button').click();
  assert(page.url().toString().includes('inventory.html'));


  //Inventory Page , Adding all items into the chart
  console.log('================== Inventory Page =================> ');
  assert(await checkNameAndPrice(page,true),'The name and prices shoul be as expected');
   
  await page.locator('//a[@data-test="shopping-cart-link"]').click();
  assert(page.url().toString().includes('cart.html'));

  // Carts Page
  console.log('================== Cart Page =================> ');
  assert(await checkNameAndPrice(page,false),'The name and prices should be as expected');
  await page.locator('id=checkout').click();


  // Checkout Step One Page
  console.log('================== Checkout Step One Page =================> ');
  await page.locator('id=first-name').fill('Klajdi');
  await page.locator('id=last-name').fill('Hoxha Sina');
  await page.locator('id=postal-code').fill('41920');
  await page.locator('id=continue').click();


  // Checkout Step two Page
  console.log('================== Checkout Step Two Page =================> ');
  assert(await checkNameAndPrice(page,false),'The name and prices shoul be as expected');
  await page.locator('id=finish').click();

  //Checkout Complete Page
  console.log('================== Checkout Complete Page =================> ');
   expect(await page.locator('//div[@data-test="complete-test"]').isVisible(), 'The complete text should be shown');


});


async function checkNameAndPrice(page,isInventoryPage){

  //Adding all items into the chart
  const invItems = page.locator('//div[@data-test="inventory-item"]');

  for(let i = 0; i<await invItems.count(); i++){

    console.log('Esta entrando en el bucle');

    let itemName = await invItems.nth(i).locator('//div[@data-test="inventory-item-name"]').innerText();
    let itemPrice = (await invItems.nth(i).locator('//div[@data-test="inventory-item-price"]').innerText()).replace('$','');

    if(!expectedNamePrice.has(itemName) || parseFloat(expectedNamePrice.get(itemName)) != parseFloat(itemPrice))
      return false
    
    console.log('Name = ', itemName);
    console.log('Price = ', itemPrice );

    if(isInventoryPage)
      await invItems.nth(i).locator('//button').click();
  }

  return true;
}



