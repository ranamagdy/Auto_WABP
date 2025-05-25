
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/auth/login');

  // ✅ Wait for spinner (if any)
  cy.get('.spinnerParent', { timeout: 10000 }).should('not.exist');

  // ✅ Use reliable selectors
  cy.get('input[formcontrolname="userName"]', { timeout: 10000 }).should('be.visible').type(email);
  cy.get('input[formcontrolname="password"]').should('be.visible').type(password);
// Correct login button locator using button text
cy.contains('button', 'Login').should('be.visible').click();

});
