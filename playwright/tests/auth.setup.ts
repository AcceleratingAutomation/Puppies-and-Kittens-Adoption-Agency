import { test as setup } from "@playwright/test";
import {
  usernameLabel,
  passwordLabel,
  loginText,
} from "../../src/accessibility/accessibilityText";
import {
  loginEndpoint,
  rescuesEndpoint,
} from "../../src/server/apiService/apiConfig";

const username = process.env.TEST_USERNAME || "Set_Your_TEST_USERNAME";
const password = process.env.TEST_PASSWORD || "Set_Your_TEST_PASSWORD";
const authFile = "./.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto(loginEndpoint);
  await page.getByLabel(usernameLabel).fill(username);
  await page.getByLabel(passwordLabel).fill(password);
  await page.getByRole("button", { name: loginText }).click();
  // Confirm logged in.
  await page.waitForURL(rescuesEndpoint);
  // Store authentication for reuse in other tests.
  await page.context().storageState({ path: authFile });
});
