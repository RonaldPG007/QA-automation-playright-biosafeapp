import { Page, Locator, expect } from '@playwright/test';

export default class PaginaLogin {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        this.loginBtn = page.getByTestId('login-button');

    }

   


}
