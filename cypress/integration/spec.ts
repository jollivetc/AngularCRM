describe('Visits the initial project page of angular-crm App', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('button').contains('Valider')
  })
})
