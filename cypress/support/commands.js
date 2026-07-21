import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/auth/login');

  // ✅ Wait for spinner (if any)
  cy.get('.spinnerParent', { timeout: 10000 }).should('not.exist');

  // ✅ Use reliable selectors
  cy.get('#UserName').should('be.visible').type(email);
  cy.get('#Password').should('be.visible').type(password);
// Correct login button locator using button text
cy.contains('button', 'Login').should('be.visible').click();


});



