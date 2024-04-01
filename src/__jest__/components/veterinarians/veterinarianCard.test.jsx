import React from "react";
import { render, screen } from "@testing-library/react";
import VeterinarianCard from "../../../components/veterinarians/VeterinarianCard";

function renderVeterinarianCard(props) {
  return render(
    <VeterinarianCard
      id={props.id}
      name={props.name}
      email={props.email}
      numCurrentRescues={props.numCurrentRescues}
      numTotalRescues={props.numTotalRescues}
      image={props.image}
      isAccepting={props.isAccepting}
    />,
  );
}

describe("Veterinarian Card", () => {
  const veterinarianProps = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    numCurrentRescues: 5,
    numTotalRescues: 10,
    image: "thumbnail-image",
    isAccepting: true,
  };

  beforeEach(() => {
    renderVeterinarianCard(veterinarianProps);
  });

  test("matches snapshot comparison", () => {
    const { asFragment } = renderVeterinarianCard(veterinarianProps);
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays veterinarian name", () => {
    expect(screen.getByText(veterinarianProps.name)).toBeInTheDocument();
  });

  test("displays email", () => {
    expect(screen.getByText(veterinarianProps.email)).toBeInTheDocument();
  });

  test("displays number of current rescues", () => {
    expect(
      screen.getByText(
        `Current Rescues: ${veterinarianProps.numCurrentRescues}`,
      ),
    ).toBeInTheDocument();
  });

  test("displays number of total rescues", () => {
    expect(
      screen.getByText(`Total Rescues: ${veterinarianProps.numTotalRescues}`),
    ).toBeInTheDocument();
  });

  test("displays accepting rescues as patients", () => {
    expect(
      screen.getByText(
        `Accepting Patients: ${veterinarianProps.isAccepting ? "Yes" : "No"}`,
      ),
    ).toBeInTheDocument();
  });

  test("displays not accepting rescues as patients", () => {
    const nonAcceptingProps = {
      ...veterinarianProps,
      isAccepting: false,
    };
    renderVeterinarianCard(nonAcceptingProps);
    expect(screen.getByText("Accepting Patients: No")).toBeInTheDocument();
  });
});
