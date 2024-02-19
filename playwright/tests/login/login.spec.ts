import { test, expect } from "@playwright/test";
import { describe } from "node:test";
import LoginPage from "../../pages/LoginPage.ts";
import {
  usernameText,
  passwordText,
  loginText,
} from "../../../src/components/login/loginText";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
  await expect.soft(page.getByText(usernameText)).toBeVisible();
  await expect.soft(page.getByText(passwordText)).toBeVisible();
  await expect.soft(page.getByText(loginText)).toBeVisible();
});

describe("visual comparison of", () => {
  test("viewable page before scrolling", async ({ page }) => {
    await expect(page).toHaveScreenshot("login-page.png");
  });

  test("entire page", async ({ page }) => {
    await expect(page).toHaveScreenshot("login-full-page.png", {
      fullPage: true,
    });
  });
});

describe("Login Page", () => {
  describe("should login with", () => {
    test.skip("valid credentials", async () => {
      await loginPage.login("username", "Password123!");
    });
  });

  describe("should NOT login with", () => {
    test("invalid credentials", async ({ page }) => {
      await loginPage.login("invalid", "Invalid1$");
      await loginPage.getIncorrectCredentialsErrorMessage();
      await expect(page).toHaveScreenshot(
        "login-error-incorrect-credentials.png",
      );
    });
    test("empty username and password", async ({ page }) => {
      await loginPage.login("", "");
      (await loginPage.getRequiredErrorMessage()).first();
      (await loginPage.getRequiredErrorMessage()).nth(1);
      await expect(page).toHaveScreenshot(
        "login-error-required-credentials.png",
      );
    });
    test("empty username", async ({ page }) => {
      await loginPage.login("", "Password123!");
      await loginPage.getRequiredErrorMessage();
      await expect(page).toHaveScreenshot("login-error-required-username.png");
    });
    test("empty password", async ({ page }) => {
      await loginPage.login("username", "");
      await loginPage.getRequiredErrorMessage();
      await expect(page).toHaveScreenshot("login-error-required-password.png");
    });
    test("password too short", async ({ page }) => {
      await loginPage.login("username", "1234567");
      await loginPage.getPasswordLengthErrorMessage();
      await expect(page).toHaveScreenshot("login-error-password-length.png");
    });
    test("password without uppercase letter", async ({ page }) => {
      await loginPage.login("username", "password123!");
      await loginPage.getPasswordUpperCaseErrorMessage();
      await expect(page).toHaveScreenshot(
        "login-error-password-without-uppercase.png",
      );
    });
    test("password without lowercase letter", async ({ page }) => {
      await loginPage.login("username", "PASSWORD123!");
      await loginPage.getPasswordLowerCaseErrorMessage();
      await expect(page).toHaveScreenshot(
        "login-error-password-without-lowercase.png",
      );
    });
    test("password without number", async ({ page }) => {
      await loginPage.login("username", "Password!");
      await loginPage.getPasswordNumberErrorMessage();
      await expect(page).toHaveScreenshot(
        "login-error-password-without-number.png",
      );
    });
    test("password without special character", async ({ page }) => {
      await loginPage.login("username", "Password123");
      await loginPage.getPasswordSpecialCharacterErrorMessage();
      await expect(page).toHaveScreenshot(
        "login-error-password-without-special-character.png",
      );
    });
  });
});
