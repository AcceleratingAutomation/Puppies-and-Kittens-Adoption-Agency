import React from "react";
import { render, screen } from "@testing-library/react";
import RescueCard from "../../../components/rescues/RescueCard";

function renderRescueCard(props) {
  return render(
    <RescueCard
      id={props.id}
      name={props.name}
      image={props.image}
      type={props.type}
      gender={props.gender}
      breed={props.breed}
      isFavorite={props.isFavorite}
      onAddFavorite={props.onAddFavorite}
      onRemoveFavorite={props.onRemoveFavorite}
    />,
  );
}

describe("Rescue Card", () => {
  const rescueProps = {
    id: "1",
    name: "Max",
    image: "thumbnail-image",
    type: "Dog",
    gender: "Male",
    breed: "Labrador",
    isFavorite: false,
    onAddFavorite: jest.fn(),
    onRemoveFavorite: jest.fn(),
  };

  beforeEach(() => {
    renderRescueCard(rescueProps);
  });

  test("matches snapshot comparison", () => {
    const { asFragment } = renderRescueCard(rescueProps);
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays rescue name", () => {
    expect(screen.getByText(rescueProps.name)).toBeInTheDocument();
  });

  test("displays type as Dog", () => {
    expect(screen.getByText(rescueProps.type)).toBeInTheDocument();
  });

  test("displays type as Cat", () => {
    const catProps = {
      ...rescueProps,
      type: "Cat",
    };
    renderRescueCard(catProps);
    expect(screen.getByText(catProps.type)).toBeInTheDocument();
  });

  test("displays gender as Male", () => {
    expect(screen.getByText(rescueProps.gender)).toBeInTheDocument();
  });

  test("displays gender as Female", () => {
    const femaleProps = {
      ...rescueProps,
      gender: "Female",
    };
    renderRescueCard(femaleProps);
    expect(screen.getByText(femaleProps.gender)).toBeInTheDocument();
  });

  test("displays breed", () => {
    expect(screen.getByText(rescueProps.breed)).toBeInTheDocument();
  });

  test("displays favorite status as not a favorite", () => {
    const favoriteButton = rescueProps.isFavorite
      ? screen.getByLabelText("Remove from favorites")
      : screen.getByLabelText("Add to favorites");
    expect(favoriteButton).toBeInTheDocument();
  });

  test("displays favorite status as a favorite", () => {
    const favoriteProps = {
      ...rescueProps,
      isFavorite: true,
    };
    renderRescueCard(favoriteProps);
    const favoriteButton = screen.getByLabelText("Remove from favorites");
    expect(favoriteButton).toBeInTheDocument();
  });
});
