/// <reference types="cypress" />

describe("bidbitz - listings", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });
  it("can show auctions for non registere users", () => {
    cy.get(".auctions-link").click();
    cy.get(".listing-link").should("exist");
  });
});
