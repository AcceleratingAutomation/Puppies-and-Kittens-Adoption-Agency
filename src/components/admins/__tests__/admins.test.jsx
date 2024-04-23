import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { FavoritesContext } from "../../../contexts/favoritesContext";
import Admins from "../Admins";
import { adminProps } from "./adminsData";
import {
  currentRescuesLabel,
  totalRescuesLabel,
  householdPetsLabel,
  favoritesLabel,
  previousLabel,
  nextLabel,
} from "../../../accessibility/accessibilityText";

const mockDispatch = jest.fn();

const mockState = {
  loading: false,
  admins: [adminProps],
};

describe("Admins", () => {
  beforeEach(() => {
    render(
      <FavoritesContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Router>
          <Admins />
        </Router>
      </FavoritesContext.Provider>,
    );
  });

  test("matches snapshot comparison", () => {
    const { asFragment } = render(
      <FavoritesContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Router>
          <Admins />
        </Router>
      </FavoritesContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays admin cards", () => {
    expect(screen.getByText(adminProps.name)).toBeInTheDocument();
    expect(screen.getByText(adminProps.email)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${currentRescuesLabel} ${adminProps.numCurrentRescues.toString()}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${totalRescuesLabel} ${adminProps.numTotalRescues.toString()}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${householdPetsLabel} ${adminProps.numHouseholdPets.toString()}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${favoritesLabel} ${adminProps.favorite.length.toString()}`,
      ),
    ).toBeInTheDocument();
  });

  test("displays pagination buttons", () => {
    expect(screen.getByText(previousLabel)).toBeInTheDocument();
    expect(screen.getByText(nextLabel)).toBeInTheDocument();
  });

  test("displays loading when state.loading is true", () => {
    const loadingState = {
      ...mockState,
      loading: true,
    };

    render(
      <FavoritesContext.Provider
        value={{ state: loadingState, dispatch: mockDispatch }}
      >
        <Router>
          <Admins />
        </Router>
      </FavoritesContext.Provider>,
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
