import { expect } from '@wdio/globals';
import { browser, $ } from '@wdio/globals';

describe('Happy Flow Test', () => {
    it('should log in, add items to the cart, and proceed to checkout', async () => {
      await browser.url('https://www.saucedemo.com/');

      await $('input[name="user-name"]').setValue('standard_user');
      await $('#password').setValue('secret_sauce');
      await $('#login-button').click();

      await $('.btn_primary').click();

      await $('//a[@class="shopping_cart_link"]').click();
      const cartCount = await $('.shopping_cart_badge').getText();
      expect(cartCount).toBe('1');

      await $('#checkout').click();
      await $('#first-name').setValue('John');
      await $('#last-name').setValue('Doe');
      await $('#postal-code').setValue('12345');
      await $('#continue').click();

      await $('#finish').click();

      const confirmationMessage = await $('//h2[contains(text(),"THANK YOU FOR YOUR ORDER")]').getText();
      expect(confirmationMessage).toBe('THANK YOU FOR YOUR ORDER');
    });});
