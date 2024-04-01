import React from "react";
import { render, screen } from "@testing-library/react";
import FosterCard from "../../../components/fosters/FosterCard";

function renderFosterCard(props) {
  return render(
    <FosterCard
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

describe("Foster Card", () => {
  const fosterProps = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    numCurrentRescues: 5,
    numTotalRescues: 10,
    image: "thumbnail-image",
    isAccepting: true,
  };

  beforeEach(() => {
    renderFosterCard(fosterProps);
  });

  test("matches snapshot comparison", () => {
    const { asFragment } = renderFosterCard(fosterProps);
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays foster name", () => {
    expect(screen.getByText(fosterProps.name)).toBeInTheDocument();
  });

  test("displays email", () => {
    expect(screen.getByText(fosterProps.email)).toBeInTheDocument();
  });

  test("displays number of current rescues", () => {
    expect(
      screen.getByText(`Current Rescues: ${fosterProps.numCurrentRescues}`),
    ).toBeInTheDocument();
  });

  test("displays number of total rescues", () => {
    expect(
      screen.getByText(`Total Rescues: ${fosterProps.numTotalRescues}`),
    ).toBeInTheDocument();
  });

  test("displays accepting rescues", () => {
    expect(
      screen.getByText(
        `Accepting Rescues: ${fosterProps.isAccepting ? "Yes" : "No"}`,
      ),
    ).toBeInTheDocument();
  });

  test("displays not accepting rescues", () => {
    const nonAcceptingProps = {
      ...fosterProps,
      isAccepting: false,
    };
    renderFosterCard(nonAcceptingProps);
    expect(screen.getByText("Accepting Rescues: No")).toBeInTheDocument();
  });
});
