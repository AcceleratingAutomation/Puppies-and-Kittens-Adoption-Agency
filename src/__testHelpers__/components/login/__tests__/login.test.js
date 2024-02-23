import {
  setup,
  fillForm,
  checkSuccessfulLoginAndRedirect,
  checkErrorMessages,
  checkNoLoginOrRedirect,
} from "../loginHelpers";
import { validLoginScenarios, noLoginOrSubmitScenarios } from "../loginData";

jest.mock("../../../../server/apiService/authApi", () => ({
  login: jest.fn(),
}));

jest.mock("../../../../utils/utils", () => ({
  updateAppSettings: jest.fn(),
}));

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

  describe.each(validLoginScenarios)(
    "should login with",
    (testTitle, username, password) => {
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
    "should not login with",
    (testTitle, username, password, expectedError1, expectedError2) => {
      it(testTitle, async () => {
        fillForm(username, password, getByLabelText, getByText);

        await checkErrorMessages(findAllByText, expectedError1, expectedError2);
        await checkNoLoginOrRedirect(mockLogin, mockHistoryPush);
      });
    },
  );
});
