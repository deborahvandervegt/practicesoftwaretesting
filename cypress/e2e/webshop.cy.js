describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://practicesoftwaretesting.com/')
    cy.get('a.card').first().click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="nav-cart"]').click()
    cy.get('tr.ng-star-inserted').should('have.length', 1)
  })
})