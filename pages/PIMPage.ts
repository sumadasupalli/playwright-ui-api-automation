import { Page } from '@playwright/test';

export class PIMPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to PIM section and wait for table or "No Records Found"
  async navigateToPIM() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.waitForLoadState('networkidle'); // wait for any XHRs

    const tableRows = this.page.locator('table tbody tr');
    const noRecords = this.page.locator('text=No Records Found');

    await Promise.race([
      tableRows.first().waitFor({ state: 'visible', timeout: 60000 }),
      noRecords.waitFor({ state: 'visible', timeout: 60000 }),
    ]);
  }

  // Click Add Employee button
  async clickAddEmployee() {
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  // Add employee
  async addEmployee(firstName: string, lastName: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForURL(/viewPersonalDetails/, { timeout: 60000 });
  }

  // Search employee
  async searchEmployee(name: string) {
    await this.page.getByPlaceholder('Type for hints...').fill(name);
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.page.waitForTimeout(1000); // give table time to refresh
  }

  // Edit employee
  async editEmployee(newFirstName: string) {
    await this.page.getByRole('button', { name: 'Edit' }).click();
    await this.page.getByPlaceholder('First Name').fill(newFirstName);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(1000);
  }

  // Delete employee
  async deleteEmployee(name: string) {
    const row = this.page.locator(`table tbody tr:has-text("${name}")`);
    await row.locator('button[title="Delete"]').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    // Wait until the row disappears
    await row.waitFor({ state: 'detached', timeout: 60000 });
  }

  // Ensure employee exists, add if not
  async ensureEmployeeExists(firstName: string, lastName: string) {
    await this.navigateToPIM();
    await this.searchEmployee(firstName);

    const noRecords = this.page.locator('text=No Records Found');
    if (await noRecords.isVisible()) {
      await this.clickAddEmployee();
      await this.addEmployee(firstName, lastName);
      await this.navigateToPIM();
    }
  }
}