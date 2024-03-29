import { test } from "@playwright/test";
import { adminAddEndpoint } from "../../../../../src/server/apiService/apiConfig";
import visualComparisons from "../../../../utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await page.goto(adminAddEndpoint);
});

test.describe("Add Admin Page", () => {
  visualComparisons("Add Admin");
});
