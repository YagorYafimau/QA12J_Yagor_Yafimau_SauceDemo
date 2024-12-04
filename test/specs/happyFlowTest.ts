import { expect } from '@wdio/globals';
import { browser, $ } from '@wdio/globals';

describe('Happy Flow Test', () => {
    it('should log in, add items to the cart, and proceed to checkout', async () => {
      await browser.url('https://www.saucedemo.com/');

      await $('#user-name').setValue('standard_user');
      await $('#password').setValue('secret_sauce');
      await $('#login-button').click();

      await $('#add-to-cart-sauce-labs-backpack').click();
      await $('#add-to-cart-sauce-labs-bike-light').click();

      await $('#shopping_cart_container').click();
      const cartCount = await $('.shopping_cart_badge').getText();
      expect(cartCount).toBe('2');

      await $('#checkout').click();
      await $('#first-name').setValue('John');
      await $('#last-name').setValue('Doe');
      await $('#postal-code').setValue('12345');
      await $('#continue').click();
      await $('#finish').click();

      const confirmationMessage = await $('#checkout_complete_container .complete-header').getText();
      expect(confirmationMessage).toBe('THANK YOU FOR YOUR ORDER');
    });});
