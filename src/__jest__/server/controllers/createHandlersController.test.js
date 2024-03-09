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
  getAllDataByType,
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
    dbType: "Adopter",
    useTypeFilter: true,
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
    dbType: "Foster",
    useTypeFilter: true,
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
    dbType: "Veterinarian",
    useTypeFilter: true,
  },
];

handlers.forEach(
  ({ type, name, handler, permissions, dbType, useTypeFilter = false }) => {
    describe(name, () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      describe("getAll sends", () => {
        test("200 and data if authorized", async () => {
          const req = httpMocks.createRequest({
            headers: {
              authorization: "Bearer token",
            },
          });
          const res = httpMocks.createResponse();
          getAudienceFromToken.mockReturnValue([permissions.read]);
          if (useTypeFilter) {
            getAllDataByType.mockResolvedValue(["data"], dbType);
          } else {
            getAllData.mockResolvedValue(["data"]);
          }
          generateToken.mockResolvedValue("newToken");

          await handler.getAll(req, res);
          expect(res.statusCode).toBe(200);
          expect(res._getData()).toEqual({
            [type]: ["data"],
            token: "newToken",
          });
        });

        test("500 if data retrieval fails", async () => {
          const req = httpMocks.createRequest({
            headers: {
              authorization: "Bearer token",
            },
          });
          const res = httpMocks.createResponse();
          getAudienceFromToken.mockReturnValue([permissions.read]);
          getAllData.mockRejectedValue(new Error("Database error"));

          await handler.getAll(req, res);
          expect(res.statusCode).toBe(500);
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
        test("200 and data if authorized", async () => {
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
          deleteData.mockResolvedValue(true);
          generateToken.mockResolvedValue("newToken");

          await handler.delete(req, res);
          expect(res.statusCode).toBe(200);
          expect(res._getData()).toEqual({
            message: `Successfully deleted ${type}`,
            token: "newToken",
          });
        });

        test("404 if not found", async () => {
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
          deleteData.mockResolvedValue(false);

          await handler.delete(req, res);
          expect(res.statusCode).toBe(404);
          expect(res._getData()).toEqual({
            message: `Cannot delete this ${type}`,
          });
        });

        test("403 if not authorized", async () => {
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

          await handler.delete(req, res);
          expect(res.statusCode).toBe(403);
          expect(res._getData()).toEqual({
            message: `Not authorized to delete ${type}`,
            token: "token",
          });
        });
      });

      describe("getDetails sends", () => {
        test("200 and data if authorized", async () => {
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

          await handler.getDetails(req, res);
          expect(res.statusCode).toBe(200);
          expect(res._getData()).toEqual({
            [type]: "data",
            token: "newToken",
          });
        });

        test("500 if data retrieval fails", async () => {
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

          await handler.getDetails(req, res);
          expect(res.statusCode).toBe(500);
        });

        test("getDetails sends 404 if data retrieval is successful but returns an empty object", async () => {
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

          await handler.getDetails(req, res);
          expect(res.statusCode).toBe(404);
        });

        test("403 if not authorized", async () => {
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

          await handler.getDetails(req, res);
          expect(res.statusCode).toBe(403);
        });
      });
    });
  },
);
