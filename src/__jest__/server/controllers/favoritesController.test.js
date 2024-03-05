const request = require("supertest");
const express = require("express");
const favoritesController = require("../../../server/controllers/favoritesController");

const app = express();
app.use(express.json());
app.get("/favorites", favoritesController.getFavorites);
app.post("/favorites/:id", favoritesController.addFavorite);
app.delete("/favorites/:id", favoritesController.deleteFavorite);

jest.mock("../../../server/shared", () => ({
  getFavoriteRescuesForUser: jest.fn(),
  getAudienceFromToken: jest.fn(),
  generateToken: jest.fn(),
  addFavoriteRescue: jest.fn(),
  deleteFavorite: jest.fn(),
}));

const {
  getFavoriteRescuesForUser,
  getAudienceFromToken,
  generateToken,
  addFavoriteRescue,
  deleteFavorite,
} = require("../../../server/shared");

describe("Favorites Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getFavorites returns favorites and new token", async () => {
    getFavoriteRescuesForUser.mockResolvedValue(["rescue1", "rescue2"]);
    generateToken.mockResolvedValue("newToken");

    const response = await request(app)
      .get("/favorites")
      .set("Authorization", "Bearer oldToken");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      favorites: ["rescue1", "rescue2"],
      token: "newToken",
    });
  });

  test("addFavorite adds a favorite and returns new token when authorized", async () => {
    getAudienceFromToken.mockReturnValue(["ADD_FAVORITE_RESCUE"]);
    addFavoriteRescue.mockResolvedValue(null);
    generateToken.mockResolvedValue("newToken");

    const response = await request(app)
      .post("/favorites/123")
      .set("Authorization", "Bearer oldToken");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Rescue added to favorites successfully",
      token: "newToken",
    });
  });

  test("deleteFavorite deletes a favorite and returns new token when authorized", async () => {
    getAudienceFromToken.mockReturnValue(["DELETE_FAVORITE"]);
    deleteFavorite.mockResolvedValue();
    generateToken.mockResolvedValue("newToken");

    const response = await request(app)
      .delete("/favorites/123")
      .set("Authorization", "Bearer oldToken");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Favorite deleted successfully",
      token: "newToken",
    });
  });

  test("addFavorite returns 403 when not authorized", async () => {
    getAudienceFromToken.mockReturnValue([]); // No permissions

    const response = await request(app)
      .post("/favorites/123")
      .set("Authorization", "Bearer oldToken");

    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({
      message: "Not authorized to add a rescue to favorites",
      token: "oldToken",
    });
  });

  test("deleteFavorite returns 403 when not authorized", async () => {
    getAudienceFromToken.mockReturnValue([]); // No permissions

    const response = await request(app)
      .delete("/favorites/123")
      .set("Authorization", "Bearer oldToken");

    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({
      message: "Not authorized to delete a favorite",
      token: "oldToken",
    });
  });

  test("getFavorites returns 500 when promise rejects", async () => {
    getFavoriteRescuesForUser.mockRejectedValue(new Error("Error message"));

    const response = await request(app)
      .get("/favorites")
      .set("Authorization", "Bearer oldToken");

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: "Error message" });
  });

  test("addFavorite returns 500 when promise rejects", async () => {
    getAudienceFromToken.mockReturnValue(["ADD_FAVORITE_RESCUE"]);
    addFavoriteRescue.mockRejectedValue(new Error("Error message"));

    const response = await request(app)
      .post("/favorites/123")
      .set("Authorization", "Bearer oldToken");

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: "Cannot add this rescue to favorites",
    });
  });

  test("deleteFavorite returns 500 when promise rejects", async () => {
    getAudienceFromToken.mockReturnValue(["DELETE_FAVORITE"]);
    deleteFavorite.mockRejectedValue(new Error("Error message"));

    const response = await request(app)
      .delete("/favorites/123")
      .set("Authorization", "Bearer oldToken");

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: "Cannot delete this favorite",
      error: "Error message",
    });
  });
});
