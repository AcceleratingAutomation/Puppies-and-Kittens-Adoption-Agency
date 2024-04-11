import { getAdminCard } from "./adminsData";

const testTitle = "Admin Card Component";

describe(testTitle, () => {
  beforeEach(() => {
    cy.mount(getAdminCard());
  });

  it("visual comparison", () => {
    cy.getByTestId("admin-card").screenshot(
      `admins/${testTitle} ${process.env.REACT_APP_ENV} env`,
      { overwrite: true },
    );
  });
});
