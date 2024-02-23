import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import Login from "../Login";
import { login } from "../../../server/apiService/authApi";
import {
  usernameText,
  passwordText,
  loginText,
  required,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  errorLoggingIntoApp,
} from "../../../accessibility/login/loginText";

export const setup = (mockLogin) => {
  login.mockImplementation(mockLogin);

  const history = createMemoryHistory();
  const mockHistoryPush = jest.spyOn(history, "push");

  const utils = render(
    <Router history={history}>
      <Login />
    </Router>,
  );

  return { ...utils, mockLogin, mockHistoryPush };
};

export const fillForm = (username, password, getByLabelText, getByText) => {
  userEvent.type(getByLabelText(usernameText), username);
  userEvent.type(getByLabelText(passwordText), password);
  userEvent.click(getByText(loginText));
};

export const checkSuccessfulLoginAndRedirect = async (
  username,
  password,
  mockLogin,
  mockHistoryPush,
) => {
  await act(async () => {
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(username, password);
      expect(mockHistoryPush).toHaveBeenCalledWith("/v1/rescues");
    });
  });
};

export const checkNoLoginOrRedirect = async (mockLogin, mockHistoryPush) => {
  await act(async () => {
    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockHistoryPush).not.toHaveBeenCalled();
    });
  });
};

export const checkErrorMessages = async (findAllByText, messages) => {
  const checks = messages.map(async (message) => {
    const errorMessages = await findAllByText(message);
    errorMessages.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  await Promise.all(checks);
};

// Login Data Scenarios
// testTitle, username, password
// The username and password are just a mocked login. Do NOT add real passwords here.
export const validLoginScenarios = [
  ["valid credentials", "username", "Password123!"],
];

// testTitle, username, password, expectedErrorMessages
export const noLoginOrSubmitScenarios = [
  [
    "invalid credentials",
    "invalid-username",
    "Invalid1$-password",
    [errorLoggingIntoApp],
  ],
  ["empty username and password", "", "", [required, required]],
  ["empty username", "", "Password123!", [required]],
  ["empty password", "username", "", [required]],
  ["password too short", "username", "1234567", [atLeast8Characters]],
  [
    "password without uppercase letter",
    "username",
    "password123!",
    [atLeastOneUppercaseLetter],
  ],
  [
    "password without lowercase letter",
    "username",
    "PASSWORD123!",
    [atLeastOneLowercaseLetter],
  ],
  ["password without number", "username", "Password!", [atLeastOneNumber]],
  [
    "password without special character",
    "username",
    "Password123",
    [atLeastOneSpecialCharacter],
  ],
  [
    "empty username and password too short",
    "",
    "1234567",
    [required, atLeast8Characters],
  ],
  [
    "empty username and password without uppercase letter",
    "",
    "password123!",
    [required, atLeastOneUppercaseLetter],
  ],
  [
    "empty username and password without lowercase letter",
    "",
    "PASSWORD123!",
    [required, atLeastOneLowercaseLetter],
  ],
  [
    "empty username and password without number",
    "",
    "Password!",
    [required, atLeastOneNumber],
  ],
  [
    "empty username and password without special character",
    "",
    "Password123",
    [required, atLeastOneSpecialCharacter],
  ],
];
