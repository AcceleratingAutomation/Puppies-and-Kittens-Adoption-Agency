import { test } from "@playwright/test";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/v1/fosters/8nbad0be-9194-413a-aecf-c8e9fb52ddf3");
});

test.describe("Foster Details Page", () => {
  visualComparisons("Foster Details", true);
});
