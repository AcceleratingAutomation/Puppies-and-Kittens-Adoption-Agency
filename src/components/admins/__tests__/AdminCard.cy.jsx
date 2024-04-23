import { getAdminCard } from "./adminsData";

const testTitle = "Admin Card Component";

describe(testTitle, () => {
  beforeEach(() => {
    cy.mount(getAdminCard());
  });

  it("visual comparison", () => {
    cy.getByTestId("admin-card").screenshot(
      `admins/${Cypress.spec.name}-screenshots/${testTitle} ${process.env.REACT_APP_ENV} env-${Cypress.browser.name}-${Cypress.platform}`,
      { overwrite: true },
    );
  });

  it("check for a11y accessability issues", () => {
    cy.checkAccessibility();
  });
});
