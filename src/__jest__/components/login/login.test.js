import {
  checkErrorMessages,
  checkNoLoginOrRedirect,
  checkSuccessfulLoginAndRedirect,
  fillForm,
  setup,
} from "./loginHelpers";
import { noLoginOrSubmitScenarios, validLoginScenarios } from "./loginData";

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
  let findAllByText;
  let mockLogin;
  let mockHistoryPush;

  /**
   * Before each test, set up the test environment and mock functions.
   */
  beforeEach(() => {
    const mockLoginFunction = jest
      .fn()
      .mockResolvedValue({ token: "fakeToken" });
    ({ getByLabelText, getByText, findAllByText, mockLogin, mockHistoryPush } =
      setup(mockLoginFunction));
  });

  /**
   * This test suite tests the login functionality with valid login scenarios.
   */
  describe.each(validLoginScenarios)(
    "should login with",
    (testTitle, username, password) => {
      /**
       * Each test fills the form with a username and password and checks that the login was successful and a redirect occurred.
       */
      it(testTitle, async () => {
        fillForm(username, password, getByLabelText, getByText);

        await checkSuccessfulLoginAndRedirect(
          username,
          password,
          mockLogin,
          mockHistoryPush,
        );
      });
    },
  );

  /**
   * This test suite tests the login functionality with scenarios where login or form submission should not occur.
   */
  describe.each(noLoginOrSubmitScenarios)(
    "should not login or submit form with",
    (testTitle, username, password, expectedError1, expectedError2) => {
      /**
       * Each test fills the form with a username and password and checks that the expected error messages are displayed and no login or redirect occurred.
       */
      it(testTitle, async () => {
        fillForm(username, password, getByLabelText, getByText);

        await checkErrorMessages(findAllByText, expectedError1, expectedError2);
        await checkNoLoginOrRedirect(mockLogin, mockHistoryPush);
      });
    },
  );
});
