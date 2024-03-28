import { test } from "@playwright/test";
import { veterinarianAddEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(veterinarianAddEndpoint);
});

test.describe("Add Veterinarian Page", () => {
  visualComparisons();
});
