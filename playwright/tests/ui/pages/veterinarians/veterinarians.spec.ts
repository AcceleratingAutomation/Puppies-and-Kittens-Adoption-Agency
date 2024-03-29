import { test } from "@playwright/test";
import { veterinariansEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(veterinariansEndpoint);
});

test.describe("Veterinarians Page", () => {
  visualComparisons("Veterinarians");
});
