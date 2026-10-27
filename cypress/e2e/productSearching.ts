import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I choose category {string}", (categoryName: string) => {
    // cy.get('[data-test="category-01M5WJFW5P7F8KYQ55Z9ZKYB17"]').click();
    cy.contains(categoryName).click()
});

When("I reset search filters", () => {
    cy.get('[data-test="search-reset"]').click();
});

When("I sort products by {string}", (sortValue: string) => {
    cy.get('[data-test="sort"]').select(sortValue);
});

When("I see the first product is {string}", (productName: string) => {
    cy.get('.container[data-test] > a').first().contains(productName);
});

When("I search for {string}", (searchTerm: string) => {
    cy.get('[data-test="search-query"]').type(searchTerm);
    cy.get('[data-test="search-submit"]').click();
});

Then("I see a search result with {int} products", (amount: number) => {
    cy.get('.container[data-test] > a').should('have.length', amount);
});
