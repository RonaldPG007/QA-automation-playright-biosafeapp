import { Page, Locator, expect } from "@playwright/test";

export default class PaginaVerificationEmail {
    readonly page: Page;
    readonly codigoVerificacionInput: Locator;
    readonly verifyButton: Locator;
    readonly verificationExitosaAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.codigoVerificacionInput = page.getByTestId('input-verification-code');
        this.verifyButton = page.getByTestId('btn-verify-email');
        this.verificationExitosaAlert = page.getByText('¡Correo verificado exitosamente!');
    }
   
}