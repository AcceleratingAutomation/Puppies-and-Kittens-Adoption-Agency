import { test, expect, Page } from "@playwright/test";

const visualComparisons = (pageTitle: string, waitForImagesToLoad = false) => {
  test.describe("visual comparison of", () => {
    test("viewable page before scrolling", async ({ page }) => {
      // Wait for all images to load on page before taking screenshot comparison.
      if (waitForImagesToLoad) {
        expect.soft(await page.getByTestId("display-image").last().isVisible());
      }

      await expect(page).toHaveScreenshot(
        `${pageTitle} viewable page ${process.env.TEST_ENV} env.png`,
      );
    });

    test("entire page", async ({ page }) => {
      // Wait for all images to load on page before taking screenshot comparison.
      if (waitForImagesToLoad) {
        expect.soft(await page.getByTestId("display-image").last().isVisible());
      }

      await expect(page).toHaveScreenshot(
        `${pageTitle} full page ${process.env.TEST_ENV} env.png`,
        {
          fullPage: true,
        },
      );
    });
  });
};

export async function setupPageRoute(
  page: Page,
  url: string,
  responseBody: any,
  status = 200,
  headers = {},
) {
  // Intercept the request
  await page.route(url, async (route, request) => {
    // Fulfill the request with test data
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(responseBody),
      headers: {
        ...request.headers(),
        ...headers,
      },
    });
  });
}

export default visualComparisons;
