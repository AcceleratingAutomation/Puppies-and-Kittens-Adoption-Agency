import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { FavoritesContext } from "../../../contexts/favoritesContext";
import AdminDetails from "../AdminDetails";
import { adminProps } from "./adminsData";
import {
  deleteDetails,
  navigateBack,
  navigateToEdit,
  getTabValue,
  getImageUrl,
  fetchDetails,
} from "../../../utils/componentUtils";
import {
  adminsEndpoint,
  adminsUrl,
} from "../../../server/apiService/apiConfig";
import {
  backLabel,
  editLabel,
  deleteLabel,
} from "../../../accessibility/accessibilityText";

const mockDispatch = jest.fn();

const mockState = {
  loading: false,
  adminDetails: adminProps,
  openDialog: false,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
  useParams: () => ({ id: "1" }),
}));

jest.mock("../../../utils/componentUtils", () => ({
  navigateBack: jest.fn(),
  navigateToEdit: jest.fn(),
  deleteDetails: jest.fn(),
  getTabValue: jest.fn(),
  getImageUrl: jest.fn(),
  fetchDetails: jest.fn(),
}));

describe("Admin Details", () => {
  let history;

  beforeEach(() => {
    history = { push: jest.fn(), location: {}, listen: jest.fn() };
    useHistory.mockReturnValue(history);
    getTabValue.mockReturnValue(5);
    getImageUrl.mockReturnValue(`/images/users/${adminProps.image}.webp`);
    fetchDetails.mockImplementation(() => {});

    render(
      <FavoritesContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Router>
          <AdminDetails />
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
          <AdminDetails />
        </Router>
      </FavoritesContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays admin name", () => {
    expect(
      screen.getByText(`${adminProps.name}'s Details`),
    ).toBeInTheDocument();
  });

  test("displays admin details layout", () => {
    expect(screen.getByTestId("admin-details-layout")).toBeInTheDocument();
  });

  test("displays details buttons", () => {
    expect(screen.getByTestId("details-buttons")).toBeInTheDocument();
  });

  test("calls navigateBack on 'Back' button click", () => {
    userEvent.click(screen.getByText(backLabel));
    expect(navigateBack).toHaveBeenCalledWith(history, adminsEndpoint);
  });

  test("calls navigateToEdit on 'Edit' button click", () => {
    userEvent.click(screen.getByText(`${editLabel} ${adminProps.name}`));
    expect(navigateToEdit).toHaveBeenCalledWith(
      history,
      adminProps.id,
      adminsEndpoint,
    );
  });

  test.skip("calls deleteDetails on 'Delete' button click", async () => {
    userEvent.click(screen.getByText(`${deleteLabel} ${adminProps.name}`));
    await expect(deleteDetails).toHaveBeenCalledWith(
      adminsUrl,
      adminProps.id,
      history,
      mockDispatch,
      adminsEndpoint,
    );
  });

  test("displays Loading component when state.loading is true", () => {
    const loadingState = {
      ...mockState,
      loading: true,
    };

    render(
      <FavoritesContext.Provider
        value={{ state: loadingState, dispatch: mockDispatch }}
      >
        <Router>
          <AdminDetails />
        </Router>
      </FavoritesContext.Provider>,
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
