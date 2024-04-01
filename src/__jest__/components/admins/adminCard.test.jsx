import React from "react";
import { render, screen } from "@testing-library/react";
import AdminCard from "../../../components/admins/AdminCard";

function renderAdminCard(props) {
  return render(
    <AdminCard
      id={props.id}
      name={props.name}
      email={props.email}
      numCurrentRescues={props.numCurrentRescues}
      numTotalRescues={props.numTotalRescues}
      numHouseholdPets={props.numHouseholdPets}
      favorite={props.favorite}
      image={props.image}
    />,
  );
}

describe("Admin Card", () => {
  const adminProps = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    numCurrentRescues: 5,
    numTotalRescues: 10,
    numHouseholdPets: 3,
    favorite: ["1", "2", "3"],
    image: "thumbnail-image",
  };

  beforeEach(() => {
    renderAdminCard(adminProps);
  });

  test("matches snapshot comparison", () => {
    const { asFragment } = renderAdminCard(adminProps);
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
      screen.getByText(`Current Rescues: ${adminProps.numCurrentRescues}`),
    ).toBeInTheDocument();
  });

  test("displays number of total rescues", () => {
    expect(
      screen.getByText(`Total Rescues: ${adminProps.numTotalRescues}`),
    ).toBeInTheDocument();
  });

  test("displays number of household pets", () => {
    expect(
      screen.getByText(`Household Pets: ${adminProps.numHouseholdPets}`),
    ).toBeInTheDocument();
  });

  test("displays number of favorites", () => {
    expect(
      screen.getByText(`Favorites: ${adminProps.favorite.length}`),
    ).toBeInTheDocument();
  });
});
