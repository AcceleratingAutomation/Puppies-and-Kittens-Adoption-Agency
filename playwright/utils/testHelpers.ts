import { test, expect } from "@playwright/test";

const visualComparisons = (pageTitle: string) => {
  test.describe("visual comparison of", () => {
    test("viewable page before scrolling", async ({ page }) => {
      await expect(page).toHaveScreenshot(
        `${pageTitle} viewable page ${process.env.TEST_ENV} env.png`,
      );
    });

    test("entire page", async ({ page }) => {
      await expect(page).toHaveScreenshot(
        `${pageTitle} full page ${process.env.TEST_ENV} env.png`,
        {
          fullPage: true,
        },
      );
    });
  });
};

export default visualComparisons;
