import { test, expect } from "@playwright/test";
import LoginPage from "../../../../ui/pages/LoginPage";
import {
  usernameLabel,
  passwordLabel,
  loginText,
  usernameRequired,
  passwordRequired,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  errorLoggingIntoApp,
} from "../../../../../src/accessibility/accessibilityText";
import noLoginOrSubmitScenarios from "../../../../../testData/login/loginData";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
  await expect.soft(page.getByText(usernameLabel)).toBeInViewport();
  await expect.soft(page.getByText(passwordLabel)).toBeInViewport();
  await expect.soft(page.getByText(loginText)).toBeInViewport();
});

test.describe("Login Page", () => {
  test.describe("visual comparison of", () => {
    test("viewable page before scrolling", async ({ page }) => {
      await expect(page).toHaveScreenshot();
    });

    test("entire page", async ({ page }) => {
      await expect(page).toHaveScreenshot({
        fullPage: true,
      });
    });
  });

  test.describe("should login with", () => {
    test.skip("valid credentials", async () => {
      await loginPage.login("username", "Password123!");
    });
  });

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
          await expect(page).toHaveScreenshot(`Login-Page-${testTitle}.png`);
        });
      },
    );
  });

  test.describe("should NOT login with", () => {
    test("invalid credentials", async ({ page }) => {
      await loginPage.login("invalid", "Invalid1$");
      await expect
        .soft(loginPage.getErrorMessage(errorLoggingIntoApp))
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot();
    });
  });
});
