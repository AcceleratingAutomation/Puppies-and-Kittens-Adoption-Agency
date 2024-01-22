import { test, expect } from '@playwright/test';

test('Visual comparison of Login screen', async ({ page }) => {
  // Navigate to the page
  await page.goto('/');

  // Take a screenshot
  const screenshot = await page.screenshot();

  // Compare the screenshot with a baseline (if available)
  expect(screenshot).toMatchSnapshot('login-page.png', {
    maxDiffPixels: 2,
  });
});