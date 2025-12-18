import BasePage from "./BasePage";

class AgentsPage extends BasePage {

  // ==========================
  // Navigation
  // ==========================
  visit() {
    cy.contains('span.nav-link-text', 'Agents').click();
  }

  // ==========================
  // Add New agent
  // ==========================
  AddNewAgent(FullName, email, integrationId = '') {
    this.clickAddNew();

    // Fill Full Name and Email
    cy.get('input[data-placeholder="Full Name"]').type(FullName);
    cy.get('input[formcontrolname="email"]').type(email);

    // Select Role (first role)
    cy.contains('Select Role').click();
    cy.get('#roleDD label').first().click();

    // Integration ID
    cy.get('body').then($body => {
      if ($body.find('input[formcontrolname="integrationId"]').length > 0) {
        cy.get('input[formcontrolname="integrationId"]', { timeout: 10000 })
          .should('be.visible')
          .then($input => {
            if (!$input.val()) {
              cy.wrap($input).type(integrationId, { force: true });
            }
          });
        }

    // Agent Recieves Chat
    cy.get('#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
      });

    // Select Team
    cy.contains('Select Team').click();
    cy.get('#teamDD label').first().click();

    // Save Agent
    this.clickSave();

  }


  // ==========================
  // Search
  // ==========================
  SearchByName(Name) {
    cy.get('input[data-placeholder="Name"]').type(Name);
    this.clickSearch();
  }

  SearchByEmail(Email) {
    cy.get('input[data-placeholder="Email"]').type(Email);
    this.clickSearch();
  }


  // ==========================
  // Edit Agent
  // ==========================
  EditAgent(Name, Email) {
    this.clickEdit();

    cy.get('input[data-placeholder="Full Name"]').clear().type(Name);
    cy.get('input[formcontrolname="email"]').clear().type(Email);

    // Agent doesn't Recieves Chat
    cy.get('#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
      
    

    this.clickSave();
  }


  // ==========================
  // Activate / Deactivate Agent
  // ==========================
  changetoNotactive() {
        cy.wait(1000);

        cy.contains('span.mat-slide-toggle-content', 'Active').should('be.visible').click();


        cy.get('#mat-dialog-title-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()

    }
    changetoActive() {
        cy.wait(1000);

        cy.contains('span.mat-slide-toggle-content', 'Not Active').should('be.visible').click();

        cy.get('#mat-dialog-title-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()


}
}
export default new AgentsPage();
