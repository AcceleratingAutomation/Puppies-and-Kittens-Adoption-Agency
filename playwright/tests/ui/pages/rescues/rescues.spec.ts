import { test } from "@playwright/test";
import { rescuesEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(rescuesEndpoint);
});

test.describe("Rescues Page", () => {
  visualComparisons();
});
