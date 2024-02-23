import {
  setup,
  fillForm,
  checkSuccessfulLoginAndRedirect,
  checkErrorMessage,
  checkNoLoginOrRedirect,
} from "../loginHelpers";
import {
  required,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  errorLoggingIntoApp,
} from "../../../../accessibility/login/loginText";
import loginData from "../loginData.json";

jest.mock("../../../../server/apiService/authApi", () => ({
  login: jest.fn(),
}));

jest.mock("../../../../utils/utils", () => ({
  updateAppSettings: jest.fn(),
}));

const errorMessages = {
  required,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  errorLoggingIntoApp,
};

describe("Login component", () => {
  let getByLabelText;
  let getByText;
  let findAllByText;
  let mockLogin;
  let mockHistoryPush;

  beforeEach(() => {
    const mockLoginFunction = jest
      .fn()
      .mockResolvedValue({ token: "fakeToken" });
    ({ getByLabelText, getByText, findAllByText, mockLogin, mockHistoryPush } =
      setup(mockLoginFunction));
  });

  describe("should login with", () => {
    it("valid credentials", async () => {
      fillForm("username", "Password123!", getByLabelText, getByText);

      await checkSuccessfulLoginAndRedirect(
        "username",
        "Password123!",
        mockLogin,
        mockHistoryPush,
      );
    });
  });

  describe.each(loginData)("should not login with", (testData) => {
    it(testData.testTitle, async () => {
      fillForm(testData.username, testData.password, getByLabelText, getByText);

      const expectedErrorMessage =
        errorMessages[testData.expectedErrorReference];
      await checkErrorMessage(
        findAllByText,
        expectedErrorMessage,
        testData.expectedErrorCount,
      );
      await checkNoLoginOrRedirect(mockLogin, mockHistoryPush);
    });
  });
});
