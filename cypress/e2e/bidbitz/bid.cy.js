/// <reference types="cypress" />

describe("bidbitz - bidding", () => {
  beforeEach(() => {
    cy.visit("localhost:5174");
  });
  it("can bid on another users listing ", () => {
    cy.get(".login-link").click();
    cy.get(".MuiInputBase-input").first().type("fjono@stud.noroff.no");
    cy.get(".MuiInputBase-input").last().type("fjonoerbono");
    cy.get(".login-button button").click();

    cy.get(".auctions-link").click();
    cy.contains("0 Bids").first().click();
    cy.get(".bid-input input").type("1");
    cy.get(".bid-btn").click();
    cy.contains("Hooray! You are #winning").should("exist");
  });
});