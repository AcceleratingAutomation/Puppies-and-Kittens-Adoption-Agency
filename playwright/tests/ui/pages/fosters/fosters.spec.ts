import { test } from "@playwright/test";
import { fostersEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(fostersEndpoint);
});

test.describe("Fosters Page", () => {
  visualComparisons("Fosters", true);
});
