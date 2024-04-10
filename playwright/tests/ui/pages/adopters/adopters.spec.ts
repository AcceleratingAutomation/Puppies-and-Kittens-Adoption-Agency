import { test } from "@playwright/test";
import { adoptersEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(adoptersEndpoint);
});

test.describe("Adopters Page", () => {
  visualComparisons("Adopters", true);
});
