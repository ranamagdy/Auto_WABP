class TeamsPage {
  visit() {
    cy.visit('https://qc-community.com/WABP_lib/AdminTool/pages/teams/index');
  }

  enterName(name) {
    cy.get('[formcontrolname="name"]').clear().type(name);
  }

  selectWorkingType() {
    // Assuming a mat-select is used, update this based on your actual UI
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains("24/7").click();
  }

  clickSearch() {
    cy.contains('button', 'Search').click();
  }

  clickClear() {
    cy.contains('button', 'Clear').click(); // Capital "Clear"
  }

  clickView() {
    cy.get('.btn-primary-outline').first().click();
  }

  clickEdit() {
    cy.get('.btn-primary-outline').first().click();
  }

  clickSave() {
    cy.get('[data-testid="save-btn"]').click();
  }

  assertTeamVisible(teamName) {
    cy.contains(teamName).should('exist');
  }

  assertNoResults() {
    cy.contains('No teams found').should('exist');
  }
}

module.exports = new TeamsPage();
