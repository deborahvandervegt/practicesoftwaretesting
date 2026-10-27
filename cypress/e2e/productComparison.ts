import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When(
  "I add {int} products to comparison from the {string}",
  (count: number, source: string) => {
    if (source === "overview") {
        cy.visit("https://practicesoftwaretesting.com/");
        cy.get('[data-test="compare-btn"]').each((btn, index) => {
        if (index < count) {
        //   console.log(`Clicked ${index}`)
          cy.wrap(btn).click();
        }
      });
    } else if (source === "detail") {
      cy.visit("https://practicesoftwaretesting.com/");
      for (let i = 0; i < count; i++) {
        cy.get("a.card").eq(i).click();
        cy.get('[data-test="add-to-compare"]').click();
        cy.visit("https://practicesoftwaretesting.com/");
      }
    } else {
      throw new Error(`Unknown comparison source: ${source}`);
    }
  }
);

When("I open the comparison page", () => {
  cy.get('[data-test="compare-link"]').click();
});

When("I click the compare link button", () => {
  cy.get('[data-test="compare-link"]').click();
});

When("I click the clear comparison button", () => {
  cy.get('[data-test="clear-comparison"]').click();
});

Then("I should see {int} product(s) in the comparison table", (count: number) => {
  cy.get('[data-test="product-name"]').should("have.length", count);
});

When("I remove the first product from the comparison", () => {
  cy.get('[data-test="remove-product"]').first().click();
});

Then("the compare buttons should be deselected", () => {
  cy.get('[data-test="compare-btn"]').should("not.have.class", "active");
});
