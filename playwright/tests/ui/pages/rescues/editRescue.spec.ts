import { test } from "@playwright/test";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/v1/rescues/a596150d-5998-4959-bc94-dbebbbe7d190/edit");
});

test.describe("Edit Rescue Details Page", () => {
  visualComparisons("Edit Rescue Details");
});
