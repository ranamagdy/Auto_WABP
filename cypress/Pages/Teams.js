import BasePage from "./BasePage";

class TeamsPage extends BasePage {

  // ==========================
  // Navigation
  // ==========================
  visit() {
    cy.contains('span.nav-link-text', 'Teams').click();
  }

  
  // ==========================
  // Selectors
  // ==========================
  nameInput() {
    return cy.get('input[formcontrolname="name"]');
  }

  workingTypeSelect() {
    return cy.get('#mat-select-value-1');
  }

  tableRows() {
    return cy.get('table tbody tr');
  }

  
  // ==========================
  // Form
  // ==========================
  enterTeamName(name) {
    this.nameInput().clear().type(name);
  }

  selectWorkingType(type) {
    this.workingTypeSelect().click();
    cy.contains('.mat-option-text', type).click();
  }

  updateWorkingType(type) {
    cy.get('.c-btn').click({ force: true });
    cy.contains('.lazyContainer li', type).click();
  }

  // ==========================
  // Table / Actions
  // ==========================
  getSearchResults() {
    return this.tableRows();
  }

  clickViewFirstTeam() {
    cy.get('.btn-primary-outline').first().click();
  }

  // ==========================
  // Assertions
  // ==========================
  assertTeamVisible(teamName) {
    cy.contains('td', teamName).should('be.visible');
  }

  assertNoResults() {
    cy.contains('No teams found').should('be.visible');
  }
}

export default new TeamsPage();
