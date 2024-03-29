import { test } from "@playwright/test";
import { adminsEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(adminsEndpoint);
});

test.describe("Admins Page", () => {
  visualComparisons("Admins");
});
