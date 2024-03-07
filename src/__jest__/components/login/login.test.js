import {
  checkErrorMessages,
  checkLoginCalledButNoRedirect,
  checkNoLoginOrRedirect,
  checkSuccessfulLoginAndRedirect,
  fillForm,
  setup,
} from "./loginHelpers";
import noLoginOrSubmitScenarios from "./loginData";
import { errorLoggingIntoApp } from "../../../accessibility/login/loginText";

// Mock the login function from the authApi module
jest.mock("../../../server/apiService/authApi", () => ({
  login: jest.fn(),
}));

// Mock the updateAppSettings function from the utils module
jest.mock("../../../utils/utils", () => ({
  updateAppSettings: jest.fn(),
}));

/**
 * This test suite tests the functionality of the Login component.
 */
describe("Login component", () => {
  let getByLabelText;
  let getByText;
  let findByText;
  let mockLogin;
  let mockHistoryPush;
  let asFragment;

  describe("", () => {
    beforeEach(() => {
      const mockLoginFunction = jest
        .fn()
        .mockResolvedValue({ token: "fakeToken" });
      ({ getByLabelText, getByText, findByText, mockLogin, mockHistoryPush } =
        setup(mockLoginFunction));
    });

    describe("should login with", () => {
      it("valid credentials", async () => {
        // The username and password are just a mocked login. Do NOT add real passwords here.
        const username = "username";
        const password = "Password123!";
        fillForm(username, password, getByLabelText, getByText);
        await checkSuccessfulLoginAndRedirect(
          username,
          password,
          mockLogin,
          mockHistoryPush,
        );
      });
    });

    describe.each(noLoginOrSubmitScenarios)(
      "should not login or submit form with",
      (testTitle, username, password, expectedError1, expectedError2) => {
        it(testTitle, async () => {
          fillForm(username, password, getByLabelText, getByText);
          await checkErrorMessages(findByText, expectedError1, expectedError2);
          await checkNoLoginOrRedirect(mockLogin, mockHistoryPush);
        });
      },
    );
  });

  describe("should submit the form but not login", () => {
    it("when a general error message is displayed", async () => {
      const username = "username";
      const password = "Password1!";
      const errorMessage = "Error logging into app.";

      const mockLoginFunction = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));
      ({ getByLabelText, getByText, findByText, mockLogin, mockHistoryPush } =
        setup(mockLoginFunction));

      fillForm(username, password, getByLabelText, getByText);
      await checkErrorMessages(findByText, errorMessage);
      await checkLoginCalledButNoRedirect(
        username,
        password,
        mockLogin,
        mockHistoryPush,
      );
    });

    it("with invalid credential", async () => {
      const username = "invalid_username";
      const password = "Invalid1$-password";

      const mockLoginFunction = jest
        .fn()
        .mockResolvedValue({ message: errorLoggingIntoApp });
      ({ getByLabelText, getByText, findByText, mockLogin, mockHistoryPush } =
        setup(mockLoginFunction));

      fillForm(username, password, getByLabelText, getByText);
      await checkErrorMessages(findByText, errorLoggingIntoApp);
      await checkLoginCalledButNoRedirect(
        username,
        password,
        mockLogin,
        mockHistoryPush,
      );
    });
  });

  describe("should render correctly", () => {
    it("in snapshot comparison after setup", () => {
      const { asFragment: fragment } = setup(mockLogin);
      asFragment = fragment;
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
