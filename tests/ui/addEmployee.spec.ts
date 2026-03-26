import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { PIMPage } from '../../pages/PIMPage';

test('Add Employee Test', async ({ page }) => {
  const login = new LoginPage(page);
  const pim = new PIMPage(page);

  await login.gotoLoginPage();
  await login.login('Admin', 'admin123');

  await pim.navigateToPIM();
  await pim.clickAddEmployee();
  await pim.addEmployee('Suma', 'Test');

  await expect(page).toHaveURL(/viewPersonalDetails/);
});