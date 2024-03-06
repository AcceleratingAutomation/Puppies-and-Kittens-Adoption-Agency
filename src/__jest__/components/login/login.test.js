import {
  checkErrorMessages,
  checkLoginCalledButNoRedirect,
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
  let asFragment;

  describe("snapshot comparison of setup", () => {
    it("renders correctly", () => {
      const { asFragment: fragment } = setup(mockLogin);
      asFragment = fragment;
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe.each(validLoginScenarios)(
    "should login with",
    (testTitle, username, password) => {
      beforeEach(() => {
        const mockLoginFunction = jest
          .fn()
          .mockResolvedValue({ token: "fakeToken" });
        ({
          getByLabelText,
          getByText,
          findAllByText,
          mockLogin,
          mockHistoryPush,
        } = setup(mockLoginFunction));
      });

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

  describe.each(noLoginOrSubmitScenarios)(
    "should not login or submit form with",
    (testTitle, username, password, expectedError1, expectedError2) => {
      beforeEach(() => {
        const mockLoginFunction = jest
          .fn()
          .mockResolvedValue({ token: "fakeToken" });
        ({
          getByLabelText,
          getByText,
          findAllByText,
          mockLogin,
          mockHistoryPush,
        } = setup(mockLoginFunction));
      });

      it(testTitle, async () => {
        fillForm(username, password, getByLabelText, getByText);
        await checkErrorMessages(findAllByText, expectedError1, expectedError2);
        await checkNoLoginOrRedirect(mockLogin, mockHistoryPush);
      });
    },
  );

  describe("should submit the form but not login", () => {
    beforeEach(() => {
      const mockLoginFunction = jest
        .fn()
        .mockRejectedValue(new Error("Error logging into app"));
      ({
        getByLabelText,
        getByText,
        findAllByText,
        mockLogin,
        mockHistoryPush,
      } = setup(mockLoginFunction));
    });

    it("when a general error message is displayed", async () => {
      fillForm("username", "Password1!", getByLabelText, getByText);
      const errorMessages = await findAllByText(/Error logging into app/i);
      expect(errorMessages).toHaveLength(1);
      await checkLoginCalledButNoRedirect(
        "username",
        "Password1!",
        mockLogin,
        mockHistoryPush,
      );
    });
  });
});
