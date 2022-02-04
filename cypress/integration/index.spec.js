/// <reference types="cypress" />

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("shows a loading information and make sure to rely on aria-busy when pressing submit", () => {
    cy.intercept("https://pokeapi.co/api/v2/pokemon/*", {
      statusCode: 500,
    });

    cy.contains("Submit").click();

    cy.contains("Loading the pokemon...").should("be.visible");
    cy.get("main").should("have.attr", "aria-busy", "true");
  });

  it("shows an error message and focus it when something is going wrong", () => {
    cy.intercept("https://pokeapi.co/api/v2/pokemon/*", {
      statusCode: 500,
    });

    cy.get("input").type("abcd");
    cy.contains("Submit").click();

    cy.contains("Something went wrong during the request").should("be.visible").and("have.focus");
  });

  it("shows the pokemon name", () => {
    cy.intercept("https://pokeapi.co/api/v2/pokemon/*", {
      statusCode: 200,
      body: {
        name: "bulbasaur",
      },
    });

    cy.get("input").type("1");
    cy.contains("Submit").click();

    cy.contains("Hello bulbasaur").should("be.visible").and("have.focus");
  });
});
