/* eslint-disable no-underscore-dangle */
/* These are provided by the node-mocks-http library and are not something that can be renamed. */
const httpMocks = require("node-mocks-http");
const { Buffer } = require("buffer");
const {
  login,
  logout,
} = require("../../../server/controllers/authenticationController");
const {
  getUserByUsername,
  isPasswordCorrect,
  generateToken,
} = require("../../../server/shared");
const {
  errorLoggingIntoApp,
} = require("../../../accessibility/login/loginText");

jest.mock("../../../server/shared");
jest.mock("../../../accessibility/login/loginText");

describe("Authentication Controller", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  describe("login", () => {
    it("should return 401 if user not found", async () => {
      getUserByUsername.mockResolvedValue(null);
      req.headers.authorization = `Basic ${Buffer.from("username:password").toString("base64")}`;
      await login(req, res, next);
      expect(res.statusCode).toBe(401);
      expect(res._getData()).toEqual({ message: errorLoggingIntoApp });
    });

    it("should return 401 if password is incorrect", async () => {
      getUserByUsername.mockResolvedValue({ key: "key" });
      isPasswordCorrect.mockResolvedValue(false);
      req.headers.authorization = `Basic ${Buffer.from("username:password").toString("base64")}`;
      await login(req, res, next);
      expect(res.statusCode).toBe(401);
      expect(res._getData()).toEqual({ message: errorLoggingIntoApp });
    });

    it("should return 200 and token if login is successful", async () => {
      getUserByUsername.mockResolvedValue({
        key: "key",
        username: "username",
        role: "role",
      });
      isPasswordCorrect.mockResolvedValue(true);
      generateToken.mockResolvedValue("token");
      req.headers.authorization = `Basic ${Buffer.from("username:password").toString("base64")}`;
      await login(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual({
        username: "username",
        role: "role",
        token: "token",
      });
    });
  });

  describe("logout", () => {
    it("should return 200 and signed out message", async () => {
      await logout(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual({ message: "Signed out" });
    });
  });
});
