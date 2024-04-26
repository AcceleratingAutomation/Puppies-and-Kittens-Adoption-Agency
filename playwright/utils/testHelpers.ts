import { test, expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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

export const axeAccessibilityChecks = () => {
  test("should have no Axe accessibility violations", async ({
    page,
  }, testInfo) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Number of violations
    const issueCount = Object.keys(accessibilityScanResults.violations).length;

    // Count of each impact level
    const impactLevels = Object.values(
      accessibilityScanResults.violations,
    ).reduce(
      (acc, violation) => {
        if (violation.impact) {
          acc[violation.impact] += 1;
        }
        return acc;
      },
      {
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0,
      },
    );

    // Fail the test if there are any critical or serious violations.
    expect.soft(impactLevels.critical).toBe(0);
    expect.soft(impactLevels.serious).toBe(0);

    if (issueCount) {
      // Log a warning if there are any violations
      console.warn(
        "There are accessibility violations. Please check the attached report for more details.",
      );
      console.warn(`Impact levels: ${JSON.stringify(impactLevels)}`);

      // Attach detailed information of the accessibility scan results to the test report.
      await testInfo.attach(
        `${issueCount}-unique-axe-accessibility-violations.txt`,
        {
          body: JSON.stringify(
            {
              impactLevels,
              violations: accessibilityScanResults.violations,
            },
            null,
            2,
          ),
          contentType: "application/json",
        },
      );
    }
  });
};

export default visualComparisons;
