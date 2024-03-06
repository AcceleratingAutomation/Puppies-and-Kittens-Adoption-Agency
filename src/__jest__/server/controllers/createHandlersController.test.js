/* eslint-disable no-underscore-dangle */
/* These are provided by the node-mocks-http library and are not something that can be renamed. */
const httpMocks = require("node-mocks-http");
const {
  adopterHandlers,
  fosterHandlers,
  rescueHandlers,
  userHandlers,
  veterinarianHandlers,
} = require("../../../server/controllers/createHandlersController");
const {
  getDetails,
  getAllData,
  getAudienceFromToken,
  generateToken,
  deleteData,
} = require("../../../server/shared");
const Constants = require("../../../server/constants");

jest.mock("../../../server/shared");

const handlers = [
  {
    type: "adopters",
    name: "adopterHandlers",
    handler: adopterHandlers,
    permissions: {
      read: Constants.SHOW_ADOPTERS,
      delete: Constants.DELETE_ADOPTER,
      showDetails: Constants.SHOW_ADOPTER_DETAILS,
    },
  },
  {
    type: "fosters",
    name: "fosterHandlers",
    handler: fosterHandlers,
    permissions: {
      read: Constants.SHOW_FOSTERS,
      delete: Constants.DELETE_FOSTER,
      showDetails: Constants.SHOW_FOSTER_DETAILS,
    },
  },
  {
    type: "rescues",
    name: "rescueHandlers",
    handler: rescueHandlers,
    permissions: {
      read: Constants.SHOW_RESCUES,
      delete: Constants.DELETE_RESCUE,
      showDetails: Constants.SHOW_RESCUE_DETAILS,
    },
  },
  {
    type: "users",
    name: "userHandlers",
    handler: userHandlers,
    permissions: {
      read: Constants.SHOW_USERS,
      delete: Constants.DELETE_USER,
      showDetails: Constants.SHOW_USER_DETAILS,
    },
  },
  {
    type: "veterinarians",
    name: "veterinarianHandlers",
    handler: veterinarianHandlers,
    permissions: {
      read: Constants.SHOW_VETERINARIANS,
      delete: Constants.DELETE_VETERINARIAN,
      showDetails: Constants.SHOW_VETERINARIAN_DETAILS,
    },
  },
];

handlers.forEach(({ type, name, handler, permissions }) => {
  describe(name, () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("getAll sends", () => {
      test("200 and data if authorized", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([permissions.read]);
        getAllData.mockResolvedValue(["data"]);
        generateToken.mockResolvedValue("newToken");

        return handler.getAll(req, res).then(() => {
          expect(res.statusCode).toBe(200);
          expect(res._getData()).toEqual({
            [type]: ["data"],
            token: "newToken",
          });
        });
      });

      test("500 if data retrieval fails", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([permissions.read]);
        getAllData.mockRejectedValue(new Error("Database error"));

        return handler.getAll(req, res).then(() => {
          expect(res.statusCode).toBe(500);
        });
      });

      test("500 and empty data if data retrieval is successful but returns an empty array", async () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([permissions.read]);
        getAllData.mockResolvedValue([]);
        generateToken.mockResolvedValue("token");

        await handler.getAll(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getData()).toEqual({ [type]: [], token: "token" });
      });

      test("403 if not authorized", async () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([]); // No permissions

        await handler.getAll(req, res);
        expect(res.statusCode).toBe(403);
      });
    });

    describe("delete sends", () => {
      test("200 and data if authorized", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
          params: {
            id: "1",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([permissions.delete]);
        deleteData.mockResolvedValue("data");
        generateToken.mockResolvedValue("newToken");

        return handler.delete(req, res).then(() => {
          expect(res.statusCode).toBe(200);
          expect(res._getData()).toEqual({
            [type]: "data",
            token: "newToken",
          });
        });
      });

      test("400 if not authorized", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
          params: {
            id: "1",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([]); // No permissions

        return handler.delete(req, res).then(() => {
          expect(res.statusCode).toBe(403);
        });
      });

      test("404 if deletion is successful but returns an empty object", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
          params: {
            id: "1",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([permissions.delete]);
        deleteData.mockResolvedValue({});

        return handler.delete(req, res).then(() => {
          expect(res.statusCode).toBe(404);
        });
      });

      test("403 if not authorized", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
          params: {
            id: "1",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([]); // No permissions

        return handler.delete(req, res).then(() => {
          expect(res.statusCode).toBe(403);
        });
      });
    });

    describe("getDetails sends", () => {
      test("200 and data if authorized", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
          params: {
            id: "1",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([permissions.showDetails]);
        getDetails.mockResolvedValue("data");
        generateToken.mockResolvedValue("newToken");

        return handler.getDetails(req, res).then(() => {
          expect(res.statusCode).toBe(200);
          expect(res._getData()).toEqual({
            [type]: "data",
            token: "newToken",
          });
        });
      });

      test("500 if data retrieval fails", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
          params: {
            id: "1",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([permissions.showDetails]);
        getDetails.mockRejectedValue(new Error("Database error"));

        return handler.getDetails(req, res).then(() => {
          expect(res.statusCode).toBe(500);
        });
      });

      test("getDetails sends 404 if data retrieval is successful but returns an empty object", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
          params: {
            id: "1",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([permissions.showDetails]);
        getDetails.mockResolvedValue({});

        return handler.getDetails(req, res).then(() => {
          expect(res.statusCode).toBe(404);
        });
      });

      test("403 if not authorized", () => {
        const req = httpMocks.createRequest({
          headers: {
            authorization: "Bearer token",
          },
          params: {
            id: "1",
          },
        });
        const res = httpMocks.createResponse();
        getAudienceFromToken.mockReturnValue([]); // No permissions

        return handler.getDetails(req, res).then(() => {
          expect(res.statusCode).toBe(403);
        });
      });
    });
  });
});
