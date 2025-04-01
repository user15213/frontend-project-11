import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const link = page.getByRole('link', { name: 'Get started' });
  await expect(link).toBeVisible();
  await link.click();

  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});
