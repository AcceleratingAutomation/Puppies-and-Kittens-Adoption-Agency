import { test } from "@playwright/test";
import { rescueAddEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(rescueAddEndpoint);
});

test.describe("Add Rescue Page", () => {
  visualComparisons("Add Rescue");
});
