Feature: Product comparison on practicesoftwaretesting.com

  Scenario Outline: Compare multiple products - <description>
    Given I visit practicesoftwaretesting.com
    When I add <count> products to comparison from the "<source>"
    And I open the comparison page
    Then I should see <count> products in the comparison table

    Examples:
      | description                                   | count | source   |
      | two products compared from overview           | 2     | overview |
      | four products compared from overview          | 4     | overview |
      | two products compared from product detail     | 2     | detail   |
      | four products compared from product detail    | 4     | detail   |

  Scenario: Selecting a fifth product does not add it to the comparison
    Given I visit practicesoftwaretesting.com
    When I add 5 products to comparison from the "overview"
    And I open the comparison page
    Then I should see 4 products in the comparison table

  Scenario: Removing a product from the comparison
    Given I visit practicesoftwaretesting.com
    When I add 2 products to comparison from the "overview"
    And I open the comparison page
    And I remove the first product from the comparison
    Then I should see 1 product in the comparison table

  Scenario: Clearing the comparison selection from the overview page
    Given I visit practicesoftwaretesting.com
    When I add 2 products to comparison from the "overview"
    And I click the clear comparison button
    Then the compare buttons should be deselected

  Scenario: Navigating to the comparison page via the compare link
    Given I visit practicesoftwaretesting.com
    When I add 2 products to comparison from the "overview"
    And I click the compare link button
    Then I should see 2 products in the comparison table