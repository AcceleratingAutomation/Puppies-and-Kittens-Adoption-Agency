import { getAdminCard } from "./adminsData";

const testTitle = "Admin Card Component";

describe(testTitle, () => {
  beforeEach(() => {
    cy.mount(getAdminCard());
  });

  it("visual comparison", () => {
    cy.getByTestId("admin-card").screenshot(
      `admins/admins.spec.ts-snapshots/components/${testTitle} ${process.env.REACT_APP_ENV} env-Google-Chrome-${Cypress.platform}`,
      { overwrite: true },
    );
  });

  it("check for a11y accessability issues", () => {
    cy.checkAccessibility();
  });
});
