import BasePage from "./BasePage";

class AgentStatus extends BasePage {

  // ==========================
  // Navigation
  // ==========================
 visit() {
    cy.contains('span.nav-link-text', 'Agent Statuses')
      .should('be.visible')
      .click();
  }

  // ==========================
  // Add New Status (Reusable)
  // ==========================
  addNewStatus(statusType, statusName) {
    this.clickAddNew();

    // Select Parent Status
    cy.contains('Select Parent Status').click();
    cy.contains('li.pure-checkbox', statusType)
      .find('input[type="checkbox"]')
      .check({ force: true });

    // Fill status name and set color
    cy.get('input[formcontrolname="statusName"]').clear().type(statusName);
    this.setColor();
    this.clickSave();
  }

  
  // ==========================
  // Edit Status
  // ==========================
  EditStatus(statusName) {
    this.clickEdit();
    cy.get('input[formcontrolname="statusName"]').clear().type(statusName);
    this.clickSave();
  }

  // ==========================
  // Search
  // ==========================
  SearchByName(statusName) {
    this.openSearch();
    cy.get('input[formcontrolname="statusName"]').clear().type(statusName);
    this.clickSearch();
  }

  SearchByActiveStatus() {
    this.openSearch();
    cy.get('#mat-select-value-1').click();
    cy.contains('.mat-option-text', 'Active').click();
    this.clickSearch();
  }

  SearchByInActiveStatus() {
    this.openSearch();
    cy.get('#mat-select-value-1').click();
    cy.contains('.mat-option-text', 'Inactive').click();
    this.clickSearch();
  }

  // ==========================
  // Set Agent Status
  // ==========================
  SetActiveStatus() {
    cy.get('.agent-status-button-inner').click();
    cy.contains('button[mat-menu-item]', 'Online').click();
  }

  SetInActiveStatus() {
    cy.get('.agent-status-button-inner').click();
    cy.contains('button[mat-menu-item]', 'Offline').click();
  }

  // ==========================
  // Helper: Set Color
  // ==========================
  setColor() {
    cy.get('input[formcontrolname="statusColor"]').then($input => {
      const nativeInput = $input[0];
      nativeInput.value = '#c25fe9ff';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
}

export default new AgentStatus();
