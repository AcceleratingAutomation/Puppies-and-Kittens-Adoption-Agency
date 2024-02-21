import { Locator, Page } from "@playwright/test";
import {
  required,
  usernameText,
  passwordText,
  loginText,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  errorLoggingIntoApp,
} from "../../src/accessibility/login/loginText";

class LoginPage {
  readonly page: Page;

  private readonly usernameInput: Locator;

  private readonly passwordInput: Locator;

  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel(usernameText);
    this.passwordInput = page.getByLabel(passwordText);
    this.submitButton = this.page.getByText(loginText);
  }

  async navigate() {
    await this.page.goto("/login");
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

  // Error messages
  async getRequiredErrorMessage() {
    return this.page.getByText(required);
  }

  async getIncorrectCredentialsErrorMessage() {
    return this.page.getByText(errorLoggingIntoApp);
  }

  async getPasswordLengthErrorMessage() {
    return this.page.getByText(atLeast8Characters);
  }

  async getPasswordUpperCaseErrorMessage() {
    return this.page.getByText(atLeastOneUppercaseLetter);
  }

  async getPasswordLowerCaseErrorMessage() {
    return this.page.getByText(atLeastOneLowercaseLetter);
  }

  async getPasswordNumberErrorMessage() {
    return this.page.getByText(atLeastOneNumber);
  }

  async getPasswordSpecialCharacterErrorMessage() {
    return this.page.getByText(atLeastOneSpecialCharacter);
  }
}

export default LoginPage;
