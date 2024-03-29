import { test, expect } from "@playwright/test";
import LoginPage from "../../../../ui/pages/LoginPage";
import {
  usernameLabel,
  passwordLabel,
  loginText,
} from "../../../../../src/accessibility/accessibilityText";
import {
  noLoginScenarios,
  noLoginOrSubmitScenarios,
} from "../../../../../testData/login/loginData";
import visualComparisons from "../../../../utils/testHelpers";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
  await expect.soft(page.getByText(usernameLabel)).toBeInViewport();
  await expect.soft(page.getByText(passwordLabel)).toBeInViewport();
  await expect.soft(page.getByText(loginText)).toBeInViewport();
});

test.describe("Login Page", () => {
  visualComparisons("Login");

  test.describe("should NOT login or make network call with", () => {
    noLoginOrSubmitScenarios.forEach(
      ([testTitle, username, password, expectedError1, expectedError2]) => {
        test(testTitle, async ({ page }) => {
          await loginPage.login(username, password);
          await expect
            .soft(loginPage.getErrorMessage(expectedError1))
            .resolves.toBeInViewport();
          if (expectedError2) {
            await expect
              .soft(loginPage.getErrorMessage(expectedError2))
              .resolves.toBeInViewport();
          }
          await expect(page).toHaveScreenshot(
            `Login Page ${testTitle} ${process.env.TEST_ENV} env.png`,
          );
        });
      },
    );
  });

  test.describe("should NOT login with", () => {
    noLoginScenarios.forEach(
      ([testTitle, username, password, expectedError]) => {
        test(testTitle, async ({ page }) => {
          await loginPage.login(username, password);
          await expect
            .soft(loginPage.getErrorMessage(expectedError))
            .resolves.toBeInViewport();
          await expect(page).toHaveScreenshot(
            `Login Page ${testTitle} ${process.env.TEST_ENV} env.png`,
          );
        });
      },
    );
  });
});
