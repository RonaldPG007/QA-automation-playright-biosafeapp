import { test, expect } from '@playwright/test';
import PaginaLanding from '../pages/PaginaLanding';
import PaginaSignUp from '../pages/PaginaSignUp';
import data from '../data/usuarios.json';
import { getVerificationCode } from '../utils/gmailUtils';
import PaginaVerificationEmail from '../pages/PaginaVerificationEmail';
import PaginaLogin from '../pages/PaginaLogin';

let paginaLanding: PaginaLanding;
let paginaSignUp: PaginaSignUp;
let paginaVerificationEmail: PaginaVerificationEmail;
let paginaLogin: PaginaLogin;

test('Registro btn', async ({ page }) => {
  paginaLanding = new PaginaLanding(page);
  paginaSignUp = new PaginaSignUp(page);
  paginaVerificationEmail = new PaginaVerificationEmail(page);
  paginaLogin = new PaginaLogin(page);

  await page.goto('https://qa.biosafeapp.com/');

  //await paginaLanding.registroBtn.click({force: true});
  //expect (page.url()).toBe('https://qa.biosafeapp.com/signup');
  //expect (page).toHaveURL('https://qa.biosafeapp.com/signup');
  await paginaLanding.irARegistrodeCuenta();

  /*
  await paginaSignUp.nombreInput.fill('Test User');
  await paginaSignUp.emailInput.fill('agush75501@gmail.com');
  await paginaSignUp.passwordInput.fill('TestPassword123*');
  await paginaSignUp.confirmarPasswordInput.fill('TestPassword123*');
  await paginaSignUp.registroBtn.click();
  await expect(paginaSignUp.registroExitosoAlert).toBeVisible(); // Verifica que la alerta de registro exitoso sea visible
  */
  //await paginaSignUp.completarRegistroExitoso('Test User', 'agush755012@gmail.com', 'TestPassword123*', 'TestPassword123*');
  
  const emailDeUusarioUnico = await paginaSignUp.completarRegistroExitoso(data.usuarios.correcto);
  //await page.waitForTimeout(5000); // Espera 5 segundos para ver el resultado

  await expect(page).toHaveURL('https://qa.biosafeapp.com/verify-email');

  const verificationCode = await getVerificationCode();

  console.log('Código de verificación:', verificationCode);

  await paginaVerificationEmail.codigoVerificacionInput.fill(verificationCode);

  await paginaVerificationEmail.verifyButton.click();

  await expect(paginaVerificationEmail.verificationExitosaAlert).toBeVisible(); // Verifica que la alerta de verificación exitosa sea visible

  await expect(page).toHaveURL('https://qa.biosafeapp.com/login');
  await paginaLogin.emailInput.fill(emailDeUusarioUnico);
  await paginaLogin.passwordInput.fill(data.usuarios.correcto.password);
  await paginaLogin.loginBtn.click();
  await expect(page).toHaveURL('https://qa.biosafeapp.com/dashboard');

  await page.waitForTimeout(5000); // Espera 5 segundos para ver el resultado
});


