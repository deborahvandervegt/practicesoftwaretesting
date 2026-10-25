import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit practicesoftwaretesting.com", () => {
  cy.visit("https://www.practicesoftwaretesting.com");
});

When("I click on the first product and I click on Add to Cart", () => {
  cy.get("a.card").first().click();
  cy.get('[data-test="add-to-cart"]').click();
  cy.get('[data-test="nav-cart"]').click();
});

Then("I should see the product in my shopping cart", () => {
  cy.get("tr.ng-star-inserted").should("have.length", 1);
});
