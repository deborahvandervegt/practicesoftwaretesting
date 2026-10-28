import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit practicesoftwaretesting.com", () => {
  cy.visit("https://practicesoftwaretesting.com");
});

When("I select {string} from the product overview", (product: string) => {
  cy.contains("a.card", product).click();
});

When("I change quantity to {string} in the {string}", (quantity: string, source: string) => {
  if (source === "detail") {
    cy.get('[data-test="quantity"]').clear().type(quantity);
  } else if (source === "cart") {
    cy.get('[data-test="product-quantity"]').clear().type(quantity);
  }
});

When("I add the product to my cart", () => {
  cy.get('[data-test="add-to-cart"]').click();
  cy.wait(1000); // Wait for the cart to update after adding the product
});

When("I go to the shopping cart", () => {
  cy.get('[data-test="nav-cart"]').click();
});

When("I proceed to checkout from the cart", () => {
  cy.get('[data-test="proceed-1"]').click();

  // Step 1: Sign in or continue as guest
  cy.get('.nav > :nth-child(2) > .nav-link').click();
  cy.get('[data-test="guest-first-name"]').type("Jane");
  cy.get('[data-test="guest-last-name"]').type("Doe");
  cy.get('[data-test="guest-email"]').type("jane.doe@example.com");
  cy.get('[data-test="guest-submit"]').click();

  // Step 2: Confirm guest details and proceed
  cy.contains("Continuing as guest: Jane Doe (jane.doe@example.com)").should(
    "be.visible"
  );
  cy.get('[data-test="proceed-2-guest"]').click();
});

// Step 3: Billing address and shipping information
When("I fill in my shipping address", () => {
  cy.get('[data-test="street"]').type("Main Street");
  cy.get('[data-test="house_number"]').type("123");
  cy.get('[data-test="city"]').type("Springfield");
  cy.get('[data-test="state"]').type("Illinois");
  cy.get('[data-test="country"]').select("United States of America (the)");
  cy.get('[data-test="postal_code"]').type("12345");
  cy.get(
    'app-address > .container > :nth-child(1) > .offset-md-3 > .float-end'
  ).click();
});

// Step 4: Payment method and details
const paymentMethodValues: Record<string, string> = {
  "Bank Transfer": "bank-transfer",
  "Cash on Delivery": "cash-on-delivery",
  "Credit Card": "credit-card",
  "Buy Now Pay Later": "buy-now-pay-later",
  "Gift Card": "gift-card",
};

When("I select {string} as my payment method", (paymentMethod: string) => {
  const value = paymentMethodValues[paymentMethod];
  if (!value) {
    throw new Error(`Unknown payment method: ${paymentMethod}`);
  }
  cy.get('[data-test="payment-method"]').select(value);

  if (paymentMethod === "Credit Card") {
    cy.get('[data-test="credit_card_number"]').type("4111-1111-1111-1111");
    cy.get('[data-test="expiration_date"]').type("12/2030");
    cy.get('[data-test="cvv"]').type("123");
    cy.get('[data-test="card_holder_name"]').type("Jane Doe");
  }

  if (paymentMethod === "Bank Transfer") {
    cy.get('[data-test="bank_name"]').type("Test Bank");
    cy.get('[data-test="account_name"]').type("Jane Doe");
    cy.get('[data-test="account_number"]').type("123456789");
  }

  if (paymentMethod === "Buy Now Pay Later") {
    cy.get('[data-test="monthly_installments"]').select("6");
  }
});

When("I complete the payment", () => {
  cy.get('[data-test="finish"]').click();
});

When("I go back", () => {
  cy.go('back');
});

Then("I should see the order confirmation", () => {
  cy.get('[data-test="payment-success-message"]').should("be.visible");
});

Then("I see {int} products in my shopping cart", (count: number) => {
  cy.get('[data-test="product-title"]').should("have.length", count);
});

When("I remove a product", () => {
  cy.intercept("DELETE", "**/carts/*/product/*").as("deleteItem");
  cy.intercept("GET", "**/carts/*").as("getCartAfterDelete");

  cy.get('[data-icon="xmark"]').first().click();

  // Wait for the deletion and the subsequent cart refresh so the cart table
  // has finished re-rendering before the next step interacts with it.
  cy.wait("@deleteItem");
  cy.wait("@getCartAfterDelete");
});

When("I change quantity to {string}", (quantity: string) => {
  cy.intercept("PUT", "**/carts/*/product/quantity").as("updateQuantity");
  cy.intercept("GET", "**/carts/*").as("getCartAfterUpdate");

  cy.get('[data-test="product-quantity"]').should("not.have.attr", "disabled");
  cy.get('[data-test="product-quantity"]').clear();
  cy.get('[data-test="product-quantity"]').should("not.have.attr", "disabled");
  cy.get('[data-test="product-quantity"]').type(quantity);
  cy.get('[data-test="product-quantity"]').blur();

  // Wait for the quantity update and the cart refresh it triggers to finish
  // before the step resolves, so the input isn't mid re-render (and possibly
  // disabled/stale) when the next step interacts with it.
  cy.wait("@updateQuantity");
  cy.wait("@getCartAfterUpdate");
});

Then("I see total price {string}", (totalPrice: string) => {
  cy.get('[data-test="line-price"]').should("have.text", totalPrice);
});  
