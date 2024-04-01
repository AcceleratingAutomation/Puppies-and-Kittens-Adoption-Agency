import React from "react";
import { render, screen } from "@testing-library/react";
import AdopterCard from "../../../components/adopters/AdopterCard";

function renderAdopterCard(props) {
  return render(
    <AdopterCard
      id={props.id}
      name={props.name}
      email={props.email}
      isAdopting={props.isAdopting}
      numHouseholdPets={props.numHouseholdPets}
      image={props.image}
    />,
  );
}

describe("AdopterCard", () => {
  const adopterProps = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    isAdopting: true,
    numHouseholdPets: 3,
    image: "placeholder-image",
  };

  beforeEach(() => {
    renderAdopterCard(adopterProps);
  });

  test("matches snapshot", () => {
    const { asFragment } = renderAdopterCard(adopterProps);
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays adopter name", () => {
    expect(screen.getByText(adopterProps.name)).toBeInTheDocument();
  });

  test("displays email", () => {
    expect(screen.getByText(adopterProps.email)).toBeInTheDocument();
  });

  test("displays currently looking to adopt", () => {
    expect(
      screen.getByText(
        `Currently Looking: ${adopterProps.isAdopting ? "Yes" : "No"}`,
      ),
    ).toBeInTheDocument();
  });

  test("displays not currently looking to adopt", () => {
    const nonAdoptingProps = {
      ...adopterProps,
      isAdopting: false,
    };
    renderAdopterCard(nonAdoptingProps);
    expect(screen.getByText("Currently Looking: No")).toBeInTheDocument();
  });

  test("displays number of household pets", () => {
    expect(
      screen.getByText(`Current Pets: ${adopterProps.numHouseholdPets}`),
    ).toBeInTheDocument();
  });
});
