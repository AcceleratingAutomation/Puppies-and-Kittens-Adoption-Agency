import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import Login from "../../../components/login/Login";
import { login } from "../../../server/apiService/authApi";
import {
  loginText,
  passwordText,
  usernameText,
} from "../../../accessibility/login/loginText";

/**
 * Sets up the test environment for the Login component.
 * @param {Function} mockLogin - The mock login function.
 * @returns {Object} The utilities from @testing-library/react's render function, the mock login function, and the mock history push function.
 */
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

/**
 * Fills the login form with the provided username and password and clicks the login button.
 * @param {string} username - The username to input.
 * @param {string} password - The password to input.
 * @param {Function} getByLabelText - The getByLabelText function from @testing-library/react.
 * @param {Function} getByText - The getByText function from @testing-library/react.
 */
export const fillForm = (username, password, getByLabelText, getByText) => {
  userEvent.type(getByLabelText(usernameText), username);
  userEvent.type(getByLabelText(passwordText), password);
  userEvent.click(getByText(loginText));
};

/**
 * Checks that the mock login function was called with the provided valid username and password.
 * Also, checks that after successful validation the mock history push function was called with "/v1/rescues".
 * @param {string} username - The expected username.
 * @param {string} password - The expected password.
 * @param {Function} mockLogin - The mock login function.
 * @param {Function} mockHistoryPush - The mock history push function.
 */
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

/**
 * Checks that the mock login function was called with the provided valid username and password.
 * Also, checks that the mock history push function was not called when an error occurred.
 * @param {string} username - The expected username.
 * @param {string} password - The expected password.
 * @param {Function} mockLogin - The mock login function.
 * @param {Function} mockHistoryPush - The mock history push function.
 */
export const checkLoginCalledButNoRedirect = async (
  username,
  password,
  mockLogin,
  mockHistoryPush,
) => {
  await act(async () => {
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(username, password);
      expect(mockHistoryPush).not.toHaveBeenCalled();
    });
  });
};

/**
 * Checks that the mock login function and the mock history push function were not called with incomplete or incorrect form data.
 * @param {Function} mockLogin - The mock login function.
 * @param {Function} mockHistoryPush - The mock history push function.
 */
export const checkNoLoginOrRedirect = async (mockLogin, mockHistoryPush) => {
  await act(async () => {
    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockHistoryPush).not.toHaveBeenCalled();
    });
  });
};

/**
 * Checks that the expected error messages are displayed in the DOM.
 * @param {Function} findAllByText - The findAllByText function from @testing-library/react. Using findAllByText because 'Required' can show up twice.
 * @param {string} error1 - The first error message to check.
 * @param {string} [error2=""] - The second error message to check. Defaults to an empty string because several scenarios only display one error.
 * Note: Ran into React console errors, for scenarios that display multiple errors, when using an array of error messages instead of the two variables.
 */
export const checkErrorMessages = async (
  findAllByText,
  error1,
  error2 = "",
) => {
  if (error1) {
    const errorMessages1 = await findAllByText(error1);
    errorMessages1.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  }

  if (error2) {
    const errorMessages2 = await findAllByText(error2);
    errorMessages2.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  }
};
