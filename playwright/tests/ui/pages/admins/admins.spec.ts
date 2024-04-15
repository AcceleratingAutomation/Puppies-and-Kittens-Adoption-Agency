import { test, expect } from "@playwright/test";
import {
  adminsEndpoint,
  adminsUrl,
} from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";
import { adminProps } from "../../../../../src/components/admins/__tests__/adminsData";

test.beforeEach(async ({ page }) => {
  // Intercept the request
  await page.route(adminsUrl, async (route, request) => {
    // Fulfill the request with test data
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ admins: [adminProps] }),
      headers: {
        ...request.headers(),
      },
    });
  });

  await page.goto(adminsEndpoint);
});

test.describe("Admins Page", () => {
  visualComparisons("Admins", true);

  test("Compare Admin Card Component", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "Google Chrome",
      "Only comparing component screenshots in Google Chrome Project",
    );

    await expect(page.getByTestId("admin-card").first()).toHaveScreenshot([
      "components",
      `Admin Card Component ${process.env.TEST_ENV} env.png`,
    ]);
  });
});
