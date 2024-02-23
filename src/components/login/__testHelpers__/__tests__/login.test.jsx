import {
  validLoginScenarios,
  noLoginOrSubmitScenarios,
  setup,
  fillForm,
  checkSuccessfulLoginAndRedirect,
  checkErrorMessages,
  checkNoLoginOrRedirect,
} from "../loginHelpers";

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
    (testTitle, username, password, expectedErrorMessages) => {
      it(testTitle, async () => {
        fillForm(username, password, getByLabelText, getByText);

        // Ensure expectedErrorMessages is an array
        const messages = Array.isArray(expectedErrorMessages)
          ? expectedErrorMessages
          : [expectedErrorMessages];

        await checkErrorMessages(findAllByText, messages);
        await checkNoLoginOrRedirect(mockLogin, mockHistoryPush);
      });
    },
  );
});
