
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/auth/login')
    cy.get('#mat-input-0').type('superadmin@admin.com')
    cy.get('#mat-input-1').type('Admin@VL')
    cy.get('.btn').click()
  
 })
