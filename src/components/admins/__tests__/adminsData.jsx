import React from "react";
import AdminCard from "../AdminCard";

export const adminProps = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  numCurrentRescues: 5,
  numTotalRescues: 10,
  numHouseholdPets: 3,
  favorite: ["1", "2", "3"],
  image: "placeholder-users",
};

export function getAdminCard() {
  return (
    <AdminCard
      id={adminProps.id}
      name={adminProps.name}
      email={adminProps.email}
      numCurrentRescues={adminProps.numCurrentRescues}
      numTotalRescues={adminProps.numTotalRescues}
      numHouseholdPets={adminProps.numHouseholdPets}
      favorite={adminProps.favorite}
      image={adminProps.image}
    />
  );
}
