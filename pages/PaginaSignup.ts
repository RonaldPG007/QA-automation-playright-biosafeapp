import { Page, Locator, expect } from '@playwright/test';

export default class PaginaSignUp {
    readonly page: Page;
    readonly nombreInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmarPasswordInput: Locator;
    readonly registroBtn: Locator;
    readonly registroExitosoAlert: Locator;


    constructor(page: Page) {
        this.page = page;
        this.nombreInput = page.getByTestId('nameInput')
        this.emailInput = page.getByTestId('emailInput');
        this.passwordInput = page.getByTestId('passwordInput');
        this.confirmarPasswordInput = page.getByTestId('confirmPasswordInput');
        this.registroBtn = page.getByTestId('botonRegistro');
        this.registroExitosoAlert = page.getByText('¡Registro exitoso!');
    }

    //async completarRegistroExitoso(nombre: string, email: string, password: string, confirmarPassword: string){
    async completarRegistroExitoso(user: any): Promise<string> {
        /*
        const mailDeUsuarioUnico = email.replace('@', "+" + Date.now() + "@"); // Asegura que el email sea único
        await this.nombreInput.fill(nombre);
        await this.emailInput.fill(mailDeUsuarioUnico);
        await this.passwordInput.fill(password);
        await this.confirmarPasswordInput.fill(confirmarPassword);
        await this.registroBtn.click();
        await expect(this.registroExitosoAlert).toBeVisible();
        */
       const mailDeUsuarioUnico = user.email.replace('@', "+" + Date.now() + "@"); // Asegura que el email sea único
        await this.nombreInput.fill(user.nombre);
        await this.emailInput.fill(mailDeUsuarioUnico);
        await this.passwordInput.fill(user.password);
        await this.confirmarPasswordInput.fill(user.confirmarPassword);
        await this.registroBtn.click();
        await expect(this.registroExitosoAlert).toBeVisible();
        await expect(this.registroExitosoAlert).not.toBeVisible();

        return mailDeUsuarioUnico; // Retorna el email único para su uso posterior
    }


}
