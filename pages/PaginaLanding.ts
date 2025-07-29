import { Page, Locator, expect } from '@playwright/test';

export default class PaginaLanding {
    readonly page: Page;
    readonly registroBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.registroBtn = page.getByRole('link', { name: 'Registrarse' }).first();
    }

    async irARegistrodeCuenta() {
       this.registroBtn.click({ force: true });
        expect(this.page).toHaveURL('https://qa.biosafeapp.com/signup');

    }


}
