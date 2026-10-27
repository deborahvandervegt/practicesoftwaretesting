Feature: Searching products

  Scenario: Search products and 
    Given I visit practicesoftwaretesting.com
    Then I see a search result with 9 products
    When I choose category "Hand Saw"
    Then I see a search result with 1 products
    When I reset search filters
    Then I see a search result with 9 products
    When I sort products by "name,asc"
    Then I see the first product is "Adjustable Wrench"
    When I sort products by "price,desc"
    Then I see the first product is "Drawer Tool Cabinet"
    When I search for "Pliers"
    Then I see a search result with 4 products
