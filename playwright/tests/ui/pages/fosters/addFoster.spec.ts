import { test } from "@playwright/test";
import { fosterAddEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(fosterAddEndpoint);
});

test.describe("Add Foster Page", () => {
  visualComparisons();
});
