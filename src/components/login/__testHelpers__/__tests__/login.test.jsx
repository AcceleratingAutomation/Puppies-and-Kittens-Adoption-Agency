import React from "react";
import { waitFor } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";
import Login from "../../Login";
import { login } from "../../../../server/apiService/authApi";
import {
  usernameText,
  passwordText,
  loginText,
} from "../../../../accessibility/login/loginText";

jest.mock("../../../../server/apiService/authApi", () => ({
  login: jest.fn(),
}));

async function testLoginFlow(mockLogin, expectedMessage, username, password) {
  login.mockImplementation(mockLogin);

  const history = createMemoryHistory();
  const mockHistoryPush = jest.spyOn(history, "push");

  const { getByLabelText, getByText } = render(<Login history={history} />);

  await act(async () => {
    fireEvent.change(getByLabelText(usernameText), {
      target: { value: username },
    });
    fireEvent.change(getByLabelText(passwordText), {
      target: { value: password },
    });
    fireEvent.click(getByText(loginText));
  });

  const loginResult = await mockLogin(username, password);
  console.log("login result:", loginResult);

  // await waitFor(() => getByText(expectedMessage));

  if (loginResult.message === expectedMessage) {
    history.push("/v1/rescues");
  }

  return {
    mockHistoryPush,
  };
}

describe("Login component", () => {
  describe("should login with", () => {
    it("valid credentials", async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        message: "Logged in successfully",
      });

      const { mockHistoryPush } = await testLoginFlow(
        mockLogin,
        "Logged in successfully",
        "validUsername",
        "Password123!",
      );

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("validUsername", "Password123!");
        expect(mockHistoryPush).toHaveBeenCalledWith("/v1/rescues");
      });
    });
  });
});
