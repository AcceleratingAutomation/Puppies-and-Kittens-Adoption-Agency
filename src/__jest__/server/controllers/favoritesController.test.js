/* eslint-disable no-underscore-dangle */
/* These are provided by the node-mocks-http library and are not something that can be renamed. */
const httpMocks = require("node-mocks-http");
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
} = require("../../../server/controllers/favoritesController");
const {
  getFavoriteRescuesForUser,
  getAudienceFromToken,
  generateToken,
  addFavoriteRescue,
  deleteFavorite: deleteFavoriteRescue,
} = require("../../../server/shared");
const Constants = require("../../../server/constants");

jest.mock("../../../server/shared");

describe("Favorites Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    req.headers.authorization = "Bearer testToken";
  });

  describe("getFavorites", () => {
    it("should successfully return favorites and a new token", async () => {
      getFavoriteRescuesForUser.mockResolvedValue(["rescue1", "rescue2"]);
      generateToken.mockResolvedValue("newToken");

      await getFavorites(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(res._getData()).toEqual({
        favorites: ["rescue1", "rescue2"],
        token: "newToken",
      });
    });

    it("should return a 500 error if there is an error", async () => {
      getFavoriteRescuesForUser.mockRejectedValue(new Error("Test error"));

      await getFavorites(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(res._getData()).toEqual({ message: "Test error" });
    });
  });

  describe("addFavorite", () => {
    beforeEach(() => {
      req.params.id = "rescue1";
    });

    it("should successfully add a favorite and return a new token", async () => {
      getAudienceFromToken.mockReturnValue([Constants.ADD_FAVORITE_RESCUE]);
      generateToken.mockResolvedValue("newToken");

      await addFavorite(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(res._getData()).toEqual({
        message: "Rescue added to favorites successfully",
        token: "newToken",
      });
    });

    it("should return a 500 error if there is an error", async () => {
      getAudienceFromToken.mockReturnValue([Constants.ADD_FAVORITE_RESCUE]);
      addFavoriteRescue.mockRejectedValue(new Error("Test error"));

      await addFavorite(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(res._getData()).toEqual({
        message: "Cannot add this rescue to favorites",
      });
    });

    it("should return a 403 error if the user is not authorized", async () => {
      getAudienceFromToken.mockReturnValue([]);

      await addFavorite(req, res);

      expect(res._getStatusCode()).toBe(403);
      expect(res._getData()).toEqual({
        message: "Not authorized to add a rescue to favorites",
        token: "testToken",
      });
    });
  });

  describe("deleteFavorite", () => {
    beforeEach(() => {
      req.params.id = "rescue1";
    });

    it("should successfully delete a favorite and return a new token", async () => {
      getAudienceFromToken.mockReturnValue([Constants.DELETE_FAVORITE]);
      generateToken.mockResolvedValue("newToken");

      await deleteFavorite(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(res._getData()).toEqual({
        message: "Favorite deleted successfully",
        token: "newToken",
      });
    });

    it("should return a 500 error if there is an error", async () => {
      getAudienceFromToken.mockReturnValue([Constants.DELETE_FAVORITE]);
      deleteFavoriteRescue.mockRejectedValue(new Error("Test error"));

      await deleteFavorite(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(res._getData()).toEqual({
        message: "Cannot delete this favorite",
        error: "Test error",
      });
    });

    it("should return a 403 error if the user is not authorized", async () => {
      getAudienceFromToken.mockReturnValue([]);

      await deleteFavorite(req, res);

      expect(res._getStatusCode()).toBe(403);
      expect(res._getData()).toEqual({
        message: "Not authorized to delete a favorite",
        token: "testToken",
      });
    });
  });
});
