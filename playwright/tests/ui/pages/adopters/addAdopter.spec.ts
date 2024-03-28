import { test } from "@playwright/test";
import { adopterAddEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(adopterAddEndpoint);
});

test.describe("Add Adopter Page", () => {
  visualComparisons();
});
