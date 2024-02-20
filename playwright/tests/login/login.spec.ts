import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import {
  usernameText,
  passwordText,
  loginText,
} from "../../../src/components/login/loginText";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
  await expect.soft(page.getByText(usernameText)).toBeInViewport();
  await expect.soft(page.getByText(passwordText)).toBeInViewport();
  await expect.soft(page.getByText(loginText)).toBeInViewport();
});

test.describe("Login Page", () => {
  test.describe("visual comparison of", () => {
    test("viewable page before scrolling", async ({ page }) => {
      await expect(page).toHaveScreenshot("login-page.png");
    });

    test("entire page", async ({ page }) => {
      await expect(page).toHaveScreenshot("login-full-page.png", {
        fullPage: true,
      });
    });
  });

  test.describe("should login with", () => {
    test.skip("valid credentials", async () => {
      await loginPage.login("username", "Password123!");
    });
  });

  test.describe("should NOT login with", () => {
    test("invalid credentials", async ({ page }) => {
      await loginPage.login("invalid", "Invalid1$");
      await expect
        .soft(loginPage.getIncorrectCredentialsErrorMessage())
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot(
        "login-error-incorrect-credentials.png",
      );
    });
    test("empty username and password", async ({ page }) => {
      await loginPage.login("", "");
      const firstErrorMessage = (
        await loginPage.getRequiredErrorMessage()
      ).first();
      const secondErrorMessage = (
        await loginPage.getRequiredErrorMessage()
      ).nth(1);
      await expect.soft(firstErrorMessage).toBeInViewport();
      await expect.soft(secondErrorMessage).toBeInViewport();
      await expect(page).toHaveScreenshot(
        "login-error-required-credentials.png",
      );
    });
    test("empty username", async ({ page }) => {
      await loginPage.login("", "Password123!");
      await expect
        .soft(loginPage.getRequiredErrorMessage())
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot("login-error-required-username.png");
    });
    test("empty password", async ({ page }) => {
      await loginPage.login("username", "");
      await expect
        .soft(loginPage.getRequiredErrorMessage())
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot("login-error-required-password.png");
    });
    test("password too short", async ({ page }) => {
      await loginPage.login("username", "1234567");
      await expect
        .soft(loginPage.getPasswordLengthErrorMessage())
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot("login-error-password-length.png");
    });
    test("password without uppercase letter", async ({ page }) => {
      await loginPage.login("username", "password123!");
      await expect
        .soft(loginPage.getPasswordUpperCaseErrorMessage())
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot(
        "login-error-password-without-uppercase.png",
      );
    });
    test("password without lowercase letter", async ({ page }) => {
      await loginPage.login("username", "PASSWORD123!");
      await expect
        .soft(loginPage.getPasswordLowerCaseErrorMessage())
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot(
        "login-error-password-without-lowercase.png",
      );
    });
    test("password without number", async ({ page }) => {
      await loginPage.login("username", "Password!");
      await expect
        .soft(loginPage.getPasswordNumberErrorMessage())
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot(
        "login-error-password-without-number.png",
      );
    });
    test("password without special character", async ({ page }) => {
      await loginPage.login("username", "Password123");
      await expect
        .soft(loginPage.getPasswordSpecialCharacterErrorMessage())
        .resolves.toBeInViewport();
      await expect(page).toHaveScreenshot(
        "login-error-password-without-special-character.png",
      );
    });
  });
});
