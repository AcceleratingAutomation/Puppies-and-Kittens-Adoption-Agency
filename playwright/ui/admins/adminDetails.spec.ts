import { test } from "@playwright/test";
import {
  adminsEndpoint,
  adminsUrl,
} from "../../../src/server/apiService/apiConfig";
import visualComparisons, { setupPageRoute } from "../../utils/testHelpers";
import { adminProps } from "../../../src/components/admins/__tests__/adminsData";

test.beforeEach(async ({ page }) => {
  await setupPageRoute(page, `${adminsUrl}/${adminProps[0].id}`, {
    admins: adminProps[0],
  });
  await page.goto(`${adminsEndpoint}/${adminProps[0].id}`);
});

test.describe("Admin Details Page", () => {
  visualComparisons("Admin Details");
});
