import { adminProps, getAdminCard } from "./adminsData";

describe("Admin Card displays the", () => {
  beforeEach(() => {
    cy.mount(getAdminCard());
  });

  it("correct name", () => {
    cy.get("h4").contains(adminProps.name);
  });

  it("correct email", () => {
    cy.get("h5").contains(adminProps.email);
  });

  it("correct number of current rescues", () => {
    cy.get("h5").contains(`Current Rescues: ${adminProps.numCurrentRescues}`);
  });

  it("correct number of total rescues", () => {
    cy.get("h5").contains(`Total Rescues: ${adminProps.numTotalRescues}`);
  });

  it("correct number of household pets", () => {
    cy.get("h5").contains(`Household Pets: ${adminProps.numHouseholdPets}`);
  });

  it("correct number of favorites", () => {
    cy.get("h5").contains(`Favorites: ${adminProps.favorite.length}`);
  });

  it("view details button", () => {
    cy.get("button").contains("VIEW DETAILS");
  });
});
