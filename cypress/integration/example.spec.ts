// https://docs.cypress.io/api/introduction/api.html
/**
 * Test Strategy
 * 1. Check Visit page
 * 2. Check contain search, movies, page, favourite
 * 3. Check click search and mutate table
 * 4. check click page and mutate table
 * 5. check click star, and add favourite 
 * 6. check delete favourite
 */

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("IMDB");
  });

  it("Check contain search, movies, page, favourite", () => {
    cy.get("div[id=search]").should("exist");
    cy.get("table[id=movies]").should("exist");
    cy.get("div[id=page]").should("exist");
    cy.get("div[id=favourite]").should("exist");
  });

  it("Check click search and mutate table", () => {
    cy.get("input[class=search-input]").type("spiderman");
    cy.get("button[class=search-button]").click();
    cy.contains("Italian Spiderman");
  });

  it("check click page and mutate table", () => {
    cy.get("input[class=search-input]").clear();
    cy.get("button[class=search-button]").click();
    cy.contains("Next").click();
  });

  it("check click star, and add favourite", () => {
    cy.contains("tt0124365").parents("tr").find("button").click();
    cy.get("div[id=favourite]").contains("tt0124365");
  });

  it("check delete favourite", () => {
    cy.get("div[id=favourite]")
      .contains("tt0124365")
      .parents("tr")
      .find("button")
      .click();
    cy.get("div[id=favourite]").contains("tt0124365").should("not.exist");
  });

});
