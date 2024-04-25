import { Locator, Page } from "@playwright/test";
import {
  usernameLabel,
  passwordLabel,
  loginText,
} from "../../../src/accessibility/accessibilityText";
import { loginEndpoint } from "../../../src/server/apiService/apiConfig";

class LoginPage {
  readonly page: Page;

  private readonly usernameInput: Locator;

  private readonly passwordInput: Locator;

  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel(usernameLabel);
    this.passwordInput = page.getByLabel(passwordLabel);
    this.submitButton = this.page.getByText(loginText);
  }

  async navigate() {
    await this.page.goto(loginEndpoint);
  }

  private async setUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  private async setPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  private async clickLogin() {
    await this.submitButton.click();
  }

  async login(username: string, password: string) {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(errorMessage: string) {
    return this.page.getByText(errorMessage);
  }
}

export default LoginPage;
