import {
  setup,
  fillForm,
  checkSuccessfulLoginAndRedirect,
  checkErrorMessage,
  checkNoLoginOrRedirect,
} from "../loginHelpers";
import { atLeast8Characters } from "../../../../accessibility/login/loginText";

jest.mock("../../../../server/apiService/authApi", () => ({
  login: jest.fn(),
}));

jest.mock("../../../../utils/utils", () => ({
  updateAppSettings: jest.fn(),
}));

describe("Login component", () => {
  describe("should login with", () => {
    it("valid credentials", async () => {
      const mockLoginFunction = jest
        .fn()
        .mockResolvedValue({ token: "fakeToken" });
      const { getByLabelText, getByText, mockLogin, mockHistoryPush } =
        setup(mockLoginFunction);

      fillForm("username", "Password123!", getByLabelText, getByText);

      await checkSuccessfulLoginAndRedirect(
        "username",
        "Password123!",
        mockLogin,
        mockHistoryPush,
      );
    });
  });

  describe("should not login with", () => {
    it("short password", async () => {
      const mockLoginFunction = jest
        .fn()
        .mockResolvedValue({ token: "fakeToken" });
      const {
        getByLabelText,
        getByText,
        findByText,
        mockLogin,
        mockHistoryPush,
      } = setup(mockLoginFunction);

      fillForm("username", "short", getByLabelText, getByText);

      await checkErrorMessage(atLeast8Characters, findByText);
      await checkNoLoginOrRedirect(mockLogin, mockHistoryPush);
    });
  });
});
