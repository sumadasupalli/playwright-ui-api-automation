import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { PIMPage } from '../../pages/PIMPage';

test('Edit Employee Test', async ({ page }) => {
  const login = new LoginPage(page);
  const pim = new PIMPage(page);

  await login.gotoLoginPage();
  await login.login('Admin', 'admin123');

  await pim.ensureEmployeeExists('Suma', 'Test');
  await pim.searchEmployee('Suma');
  await pim.editEmployee('SumaUpdated');

  await expect(page.locator('input[name="firstName"]')).toHaveValue('SumaUpdated');
});