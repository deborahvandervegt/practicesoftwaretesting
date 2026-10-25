Feature: practicesoftwaretesting.com
  Scenario: Order a product 
    Given I visit practicesoftwaretesting.com
    When I click on the first product and I click on Add to Cart
    Then I should see the product in my shopping cart
