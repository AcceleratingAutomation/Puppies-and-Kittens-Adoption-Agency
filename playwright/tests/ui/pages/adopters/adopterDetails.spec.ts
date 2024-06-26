import { test } from "@playwright/test";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/v1/adopters/1q47d9f6-e7c3-488b-bf89-0c1f60bed381");
});

test.describe("Adopter Details Page", () => {
  visualComparisons("Adopter Details", true);
});
