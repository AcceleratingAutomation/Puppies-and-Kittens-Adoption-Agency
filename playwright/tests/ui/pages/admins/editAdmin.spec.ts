import { test } from "@playwright/test";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/v1/admins/677c96e2-cb5e-11ea-87d0-0242ac130004/edit");
});

test.describe("Edit Admin Details Page", () => {
  visualComparisons("Edit Admin Details");
});
