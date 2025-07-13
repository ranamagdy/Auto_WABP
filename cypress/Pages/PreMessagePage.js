class PreMessagePage {
  visit() {

    //cy.visit ('/preMessages/index');
    cy.get('#cdk-accordion-child-1 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(4) > .subnav-link').click();


    cy.visit('https://qc-community.com/WABP_lib/AdminTool/pages/preMessages/index');
  }
  getSearchInput() {
    return cy.get('input[formcontrolname="message"]');
  }

  enterSearchMessage(message) {
    cy.get('[formcontrolname="message"]').type(message);
  }

  clickSearch() {
    cy.contains('button', 'Search', { matchCase: false }).click();
  }

  clickClear() {
    cy.contains('button', 'Clear', { matchCase: false }).click();
  }

  getSearchResults() {
    return cy.get('table');
  }

  clickAdd() {
    cy.contains('button', 'Add', { matchCase: false }).click();
  }

  fillnewMessage(message) {
    cy.get('[formcontrolname="message"]').clear().type(message);
  }

  clickSave() {
    cy.contains('button', 'Save', { matchCase: false }).click();
  }

  clickEditFirst() {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', 'Edit').click();
    });
  }

  clickDeleteFirst() {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', 'Delete').click();
    });
  }

  confirmDelete() {
    cy.get('.mat-dialog-actions > .btn-black').click()
  }

}

export default new PreMessagePage();