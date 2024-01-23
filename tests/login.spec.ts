import { test, expect } from '@playwright/test';

test('Visual comparison of Login screen', async ({ page }) => {
  // Navigate to the page
  await page.goto('/');

  await expect(page).toHaveScreenshot('login-page.png',
   { fullPage: true });
});