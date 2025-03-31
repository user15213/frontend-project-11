import { test, expect } from '@playwright/test';

test('should add RSS feed successfully', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#rss-url', 'https://example.com/rss');
  await page.click('#submit-button');
  await expect(page.locator('#message-box')).toHaveText('RSS успешно добавлен');
});
