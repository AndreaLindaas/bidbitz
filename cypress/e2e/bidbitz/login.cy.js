/// <reference types="cypress" />

describe("bidbitz - login", () => {
  beforeEach(() => {
    cy.visit("https://bidbitz-staging.netlify.app/");
  });
  it("can login", () => {
    cy.get(".login-link").click();
    cy.get(".MuiInputBase-input").first().type("fjono@stud.noroff.no");
    cy.get(".MuiInputBase-input").last().type("fjonoerbono");
    cy.get(".login-button button").click();
    cy.contains("Hello Fjono").should("exist");
  });
});
