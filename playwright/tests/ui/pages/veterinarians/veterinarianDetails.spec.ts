import { test } from "@playwright/test";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/v1/veterinarians/1a6150a9-44fc-4a64-8fa1-663f2ff5eb63");
});

test.describe("Veterinarian Details Page", () => {
  visualComparisons("Veterinarian Details", true);
});
