import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { getTabValue } from "../../../utils/componentUtils";
import { adminInitialValues } from "../../../utils/formInitialValues";
import CreateAdminDetails from "../CreateAdminDetails";
import {
  bioLabel,
  displayNameLabel,
  firstNameLabel,
  hasBackgroundCheckLabel,
  imageLabel,
  lastNameLabel,
  numCurrentRescuesLabel,
  numHouseholdPeopleLabel,
  numHouseholdPetsLabel,
  numTotalRescuesLabel,
  saveLabel,
  cancelLabel,
} from "../../../accessibility/accessibilityText";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../../../utils/componentUtils", () => ({
  createDetails: jest.fn(),
  getTabValue: jest.fn(),
}));

describe("Create Admin Details", () => {
  beforeEach(() => {
    getTabValue.mockReturnValue(5);
    render(
      <Router>
        <CreateAdminDetails />
      </Router>,
    );
  });

  test("matches snapshot comparison", () => {
    const { asFragment } = render(
      <Router>
        <CreateAdminDetails />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays title", () => {
    expect(screen.getByText("Add New Admin")).toBeInTheDocument();
  });

  test("displays expected labels with form fields set to admin initial values", () => {
    expect(screen.getByLabelText(firstNameLabel).value).toBe(
      adminInitialValues.firstName,
    );
    expect(screen.getByLabelText(lastNameLabel).value).toBe(
      adminInitialValues.lastName,
    );
    expect(screen.getByLabelText(displayNameLabel).value).toBe(
      adminInitialValues.name,
    );
    expect(screen.getByLabelText(numHouseholdPeopleLabel).value).toBe(
      adminInitialValues.numHouseholdPeople.toString(),
    );
    expect(screen.getByLabelText(numHouseholdPetsLabel).value).toBe(
      adminInitialValues.numHouseholdPets.toString(),
    );
    expect(screen.getByLabelText(hasBackgroundCheckLabel).checked).toBe(
      adminInitialValues.hasBackgroundCheck,
    );
    expect(screen.getByLabelText(imageLabel).value).toBe(
      adminInitialValues.image,
    );
    expect(screen.getByLabelText(numCurrentRescuesLabel).value).toBe(
      adminInitialValues.numCurrentRescues.toString(),
    );
    expect(screen.getByLabelText(numTotalRescuesLabel).value).toBe(
      adminInitialValues.numTotalRescues.toString(),
    );
  });

  test("displays bio label", () => {
    expect(screen.getByText(bioLabel)).toBeInTheDocument();
  });

  test("displays expected buttons", () => {
    expect(screen.getByText(saveLabel)).toBeInTheDocument();
    expect(screen.getByText(cancelLabel)).toBeInTheDocument();
  });
});
