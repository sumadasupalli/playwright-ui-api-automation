import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { PIMPage } from '../../pages/PIMPage';

test('Delete Employee Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const pimPage = new PIMPage(page);

  const employeeName = 'SumaUpdated';

  await loginPage.gotoLoginPage();
  await loginPage.login('Admin', 'admin123');

  // Ensure employee exists
  await pimPage.ensureEmployeeExists(employeeName, 'Test');

  await pimPage.navigateToPIM();
  await pimPage.searchEmployee(employeeName);
  await pimPage.deleteEmployee(employeeName);

  await expect(page.locator('text=No Records Found')).toBeVisible();
});