Feature: practicesoftwaretesting.com

  Scenario Outline: Purchase products end to end - <description>
    Given I visit practicesoftwaretesting.com
    When I select "<product>" from the product overview
    And I set the quantity to <quantity>
    And I add the product to my cart
    And I go to the shopping cart
    And I proceed to checkout from the cart
    And I fill in my shipping address
    And I select "<paymentMethod>" as my payment method
    And I complete the payment
    Then I should see the order confirmation

    Examples:
      | description                                | product            | quantity | paymentMethod     |
      | single item, credit card                   | Combination Pliers | 1        | Credit Card       |
      | bulk quantity, bank transfer               | Combination Pliers | 3        | Bank Transfer     |
      | multiple items via cart, buy now pay later | Slip Joint Pliers  | 2        | Buy Now Pay Later |
