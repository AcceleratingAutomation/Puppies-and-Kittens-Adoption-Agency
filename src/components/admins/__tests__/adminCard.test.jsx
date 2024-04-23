import { render, screen } from "@testing-library/react";
import { adminProps, getAdminCard } from "./adminsData";
import {
  currentRescuesLabel,
  totalRescuesLabel,
  householdPetsLabel,
  favoritesLabel,
  viewDetailsLabel,
} from "../../../accessibility/accessibilityText";

describe("Admin Card", () => {
  beforeEach(() => {
    render(getAdminCard());
  });

  test("matches snapshot comparison", () => {
    const { asFragment } = render(getAdminCard());
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays admin name", () => {
    expect(screen.getByText(adminProps.name)).toBeInTheDocument();
  });

  test("displays email", () => {
    expect(screen.getByText(adminProps.email)).toBeInTheDocument();
  });

  test("displays number of current rescues", () => {
    expect(
      screen.getByText(
        `${currentRescuesLabel} ${adminProps.numCurrentRescues}`,
      ),
    ).toBeInTheDocument();
  });

  test("displays number of total rescues", () => {
    expect(
      screen.getByText(`${totalRescuesLabel} ${adminProps.numTotalRescues}`),
    ).toBeInTheDocument();
  });

  test("displays number of household pets", () => {
    expect(
      screen.getByText(`${householdPetsLabel} ${adminProps.numHouseholdPets}`),
    ).toBeInTheDocument();
  });

  test("displays number of favorites", () => {
    expect(
      screen.getByText(`${favoritesLabel} ${adminProps.favorite.length}`),
    ).toBeInTheDocument();
  });

  test("displays view details button", () => {
    expect(screen.getByText(viewDetailsLabel)).toBeInTheDocument();
  });
});
