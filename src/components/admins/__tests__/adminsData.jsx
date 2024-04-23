import React from "react";
import AdminCard from "../AdminCard";

export const adminProps = {
  id: "1",
  username: "admin",
  name: "Adam Administrator",
  displayName: "Adam",
  firstName: "Adam",
  lastName: "Administrator",
  email: "admin.administrator@example.com",
  numCurrentRescues: 5,
  numTotalRescues: 10,
  numHouseholdPets: 3,
  numHouseholdPeople: 2,
  favorite: ["1", "2", "3"],
  type: "Admin",
  role: "admin",
  hasBackgroundCheck: true,
  image: "placeholder-users",
  bio: "Adam is an administrator.",
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
