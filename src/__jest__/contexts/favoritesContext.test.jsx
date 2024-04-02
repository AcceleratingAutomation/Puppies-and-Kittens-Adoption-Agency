import React from "react";
import { render } from "@testing-library/react";
import {
  reducer,
  initialState,
  FavoritesProvider,
} from "../../contexts/favoritesContext";

describe("Favorites Context", () => {
  describe("initial state", () => {
    it("should have the expected structure and values", () => {
      const expectedInitialState = {
        adopters: [],
        favorites: [],
        fosters: [],
        loading: true,
        openDialog: false,
        rescueDetails: null,
        rescues: [],
        veterinarians: [],
        admins: [],
      };

      expect(initialState).toEqual(expectedInitialState);
    });
  });

  describe("reducer should", () => {
    it("set adopters", () => {
      const action = { type: "setAdopters", value: ["adopter1", "adopter2"] };
      const expectedState = {
        ...initialState,
        adopters: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set adopter details", () => {
      const action = { type: "setAdopterDetails", value: "adopterDetails" };
      const expectedState = {
        ...initialState,
        adopterDetails: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set fosters", () => {
      const action = { type: "setFosters", value: ["foster1", "foster2"] };
      const expectedState = {
        ...initialState,
        fosters: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set foster details", () => {
      const action = { type: "setFosterDetails", value: "fosterDetails" };
      const expectedState = {
        ...initialState,
        fosterDetails: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set rescues", () => {
      const action = { type: "setRescues", value: ["rescue1", "rescue2"] };
      const expectedState = {
        ...initialState,
        rescues: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set rescue details", () => {
      const action = { type: "setRescueDetails", value: "rescueDetails" };
      const expectedState = {
        ...initialState,
        rescueDetails: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set admins", () => {
      const action = { type: "setAdmins", value: ["admin1", "admin2"] };
      const expectedState = {
        ...initialState,
        admins: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set admin details", () => {
      const action = { type: "setAdminDetails", value: "adminDetails" };
      const expectedState = {
        ...initialState,
        adminDetails: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set veterinarians", () => {
      const action = { type: "setVeterinarians", value: ["vet1", "vet2"] };
      const expectedState = {
        ...initialState,
        veterinarians: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set veterinarian details", () => {
      const action = { type: "setVeterinarianDetails", value: "vetDetails" };
      const expectedState = {
        ...initialState,
        veterinarianDetails: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("set favorites", () => {
      const action = {
        type: "setFavorites",
        value: ["favorite1", "favorite2"],
      };
      const expectedState = {
        ...initialState,
        favorites: action.value,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("add to favorites", () => {
      const action = { type: "addToFavorites", id: "1" };
      const state = {
        ...initialState,
        rescues: [
          { id: "1", isFavorite: false },
          { id: "2", isFavorite: false },
        ],
      };
      const expectedState = {
        ...state,
        rescues: [
          { id: "1", isFavorite: true },
          { id: "2", isFavorite: false },
        ],
      };
      expect(reducer(state, action)).toEqual(expectedState);
    });

    it("remove from favorites", () => {
      const action = { type: "removeFromFavorites", id: "1" };
      const state = {
        ...initialState,
        rescues: [
          { id: "1", isFavorite: true },
          { id: "2", isFavorite: false },
        ],
        favorites: ["1", "2"],
      };
      const expectedState = {
        ...state,
        rescues: [
          { id: "1", isFavorite: false },
          { id: "2", isFavorite: false },
        ],
        favorites: ["2"],
      };
      expect(reducer(state, action)).toEqual(expectedState);
    });

    it("set loading", () => {
      const action = { type: "setLoading", value: false };
      const expectedState = {
        ...initialState,
        loading: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("open dialog", () => {
      const action = { type: "openDialog" };
      const expectedState = {
        ...initialState,
        openDialog: true,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("close dialog", () => {
      const action = { type: "closeDialog" };
      const expectedState = {
        ...initialState,
        openDialog: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it("throw an error when an unknown action type is provided", () => {
      const unknownAction = { type: "unknown" };
      expect(() => reducer(initialState, unknownAction)).toThrow(Error);
    });
  });

  describe("Favorites Provider", () => {
    it("should render children", () => {
      const { getByText } = render(
        <FavoritesProvider>
          <div>Test child</div>
        </FavoritesProvider>,
      );

      expect(getByText("Test child")).toBeInTheDocument();
    });
  });
});
