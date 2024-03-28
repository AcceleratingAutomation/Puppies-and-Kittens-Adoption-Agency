import { test, expect } from "@playwright/test";
import { fostersEndpoint } from "../../../../../src/server/apiService/apiConfig";

test.beforeEach(async ({ page }) => {
  await page.goto(fostersEndpoint);
});

test.describe("Fosters Page", () => {
  test.describe("visual comparison of", () => {
    test("viewable page before scrolling", async ({ page }) => {
      await expect(page).toHaveScreenshot();
    });

    test("entire page", async ({ page }) => {
      await expect(page).toHaveScreenshot({
        fullPage: true,
      });
    });
  });
});
