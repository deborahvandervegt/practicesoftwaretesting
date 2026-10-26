Feature: practicesoftwaretesting.com

  Scenario Outline: Purchase products end to end - <description>
    Given I visit practicesoftwaretesting.com
    When I select "<product>" from the product overview
    And I set the quantity to <quantity>
    And I add the product to my cart
    And I proceed to checkout from the "<checkoutEntryPoint>"
    And I fill in my shipping address
    And I select "<paymentMethod>" as my payment method
    And I complete the payment
    Then I should see the order confirmation

    Examples:
      | description                                          | product            | quantity | checkoutEntryPoint | paymentMethod      |
      | single item, credit card                             | Combination Pliers | 1        | cart                | Credit Card        |
      | bulk quantity, bank transfer                         | Combination Pliers | 3        | cart                | Bank Transfer      |
      | multiple items via cart, buy now pay later           | Slip Joint Pliers  | 2        | cart                | Buy Now Pay Later  |
