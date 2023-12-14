/// <reference types="cypress" />

describe("bidbitz - listings", () => {
  beforeEach(() => {
    cy.visit("https://bidbitz-staging.netlify.app/");
  });
  it("can show auctions for non registere users", () => {
    cy.get(".auctions-link").click();
    cy.get(".listing-link").should("exist");
  });
});
