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
  usernameText,
  passwordText,
  loginText,
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

export const checkErrorMessages = async (findAllByText, text1, text2 = "") => {
  if (text1) {
    const errorMessages1 = await findAllByText(text1);
    errorMessages1.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  }

  if (text2) {
    const errorMessages2 = await findAllByText(text2);
    errorMessages2.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  }
};
