import { test } from "@playwright/test";
import {
  adminsEndpoint,
  adminsUrl,
} from "../../../src/server/apiService/apiConfig";
import visualComparisons, {
  setupPageRoute,
  axeAccessibilityChecks,
} from "../../utils/testHelpers";
import { adminProps } from "../../../src/components/admins/__tests__/adminsData";

test.beforeEach(async ({ page }) => {
  await setupPageRoute(page, adminsUrl, { admins: adminProps });
  await page.goto(adminsEndpoint);
});

test.describe("Admins Page", () => {
  visualComparisons("Admins");
  axeAccessibilityChecks();
});
