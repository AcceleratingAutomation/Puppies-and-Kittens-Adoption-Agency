import { test } from "@playwright/test";
import { favoritesEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(favoritesEndpoint);
});

test.describe("Favorites Page", () => {
  visualComparisons("Favorites");
});
