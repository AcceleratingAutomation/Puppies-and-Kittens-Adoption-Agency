import { Page } from "@playwright/test";
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
} from "../../src/components/login/loginText";

class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("/login");
  }

  private async getUsernameInput() {
    return this.page.getByLabel(usernameText);
  }

  private async setUsername(username: string) {
    const usernameInput = await this.getUsernameInput();
    await usernameInput.fill(username);
  }

  private async getPasswordInput() {
    return this.page.getByLabel(passwordText);
  }

  private async setPassword(password: string) {
    const passwordInput = await this.getPasswordInput();
    await passwordInput.fill(password);
  }

  private async getLoginButton() {
    return this.page.getByText(loginText);
  }

  private async submit() {
    const submitButton = await this.getLoginButton();
    await submitButton.click();
  }

  async login(username: string, password: string) {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.submit();
  }

  // Error messages
  async getRequiredErrorMessage() {
    return this.page.getByText(required);
  }

  async getIncorrectErrorMessage() {
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
