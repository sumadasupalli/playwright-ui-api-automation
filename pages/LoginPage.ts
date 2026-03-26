import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLoginPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Wait for username and password fields
    await this.page.getByPlaceholder('Username').waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByPlaceholder('Password').waitFor({ state: 'visible', timeout: 30000 });
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    // Wait for dashboard
    await this.page.waitForURL(/dashboard/, { timeout: 60000 });
  }
}