Feature: Shopping cart

  Scenario: Adding, removing and changing quantity in shopping cart
    Given I visit practicesoftwaretesting.com
    When I select "Slip Joint Pliers" from the product overview
    And I add the product to my cart
    And I go back
    When I select "Bolt Cutters" from the product overview
    And I add the product to my cart
    And I go to the shopping cart
    Then I see 2 products in my shopping cart
    When I remove a product
    Then I see 1 products in my shopping cart
    When I change quantity to "2"
    Then I see total price "$96.82"
    When I change quantity to "100"
    Then I see total price "$4,792.59"
    When I change quantity to "-1"
    Then I see total price "$48.41"
