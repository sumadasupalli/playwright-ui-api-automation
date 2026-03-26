import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Valid Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login('Admin', 'admin123');

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();
});