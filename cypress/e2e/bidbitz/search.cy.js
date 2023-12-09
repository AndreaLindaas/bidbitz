/// <reference types="cypress" />

describe("bidbitz", () => {
  beforeEach(() => {
    cy.visit("localhost:5174");
  });
  it("can show auctions for non registere users", () => {
    cy.get(".auctions-link").click();
    cy.get(".listing-link").should("exist");
  });
});
