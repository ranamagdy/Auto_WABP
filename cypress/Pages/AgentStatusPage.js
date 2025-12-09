import BasePage from "./BasePage";

class AgentStatus extends BasePage {

  visit() {
    cy.contains('span', 'Agent Statuses').click();
  }

  // ----------------- Add New Inactive Status -----------------
  AddInActiveNewStatus(RandomStatus) {

    this.clickAddNew();

    cy.contains('Select Parent Status').click();
    cy.contains('li.pure-checkbox', 'Inactive')
      .find('input[type="checkbox"]')
      .check({ force: true });

    cy.get('input[formcontrolname="statusName"]').type(RandomStatus);
    this.setColor();

    this.clickSave();
  }

  // ----------------- Add New Active Status -----------------
  AddActiveNewStatus(RandomStatus) {

    this.clickAddNew();

    cy.contains('Select Parent Status').click();
    cy.contains('li.pure-checkbox', 'Active')
      .find('input[type="checkbox"]')
      .check({ force: true });

    cy.get('input[formcontrolname="statusName"]').type(RandomStatus);
    this.setColor();

    this.clickSave();
  }

  // ----------------- Edit -----------------
  EditStatus(EditStatus) {
    this.clickEdit();
    cy.get('input[formcontrolname="statusName"]').clear().type(EditStatus);
    this.clickSave();
  }

  // ----------------- Search -----------------
  SearchByName(StatusName) {
    cy.get('input[formcontrolname="statusName"]').type(StatusName);
    this.clickSearch();
  }

  SearchByActiveStatus() {
    cy.get('#mat-select-value-1').click();
    cy.contains('.mat-option-text', 'Active').click();
    this.clickSearch();
  }

  SearchByInActiveStatus() {
    cy.get('#mat-select-value-1').click();
    cy.contains('.mat-option-text', 'Inactive').click();
    this.clickSearch();
  }

  // ----------------- Set Status -----------------
  SetActiveStatus() {
    cy.get('.agent-status-button-inner').click();
    cy.contains('button[mat-menu-item]', 'Online').click();
  }

  SetInActiveStatus() {
    cy.get('.agent-status-button-inner').click();
    cy.contains('button[mat-menu-item]', 'Offline').click();
  }


  // ----------------- Helper: Set Color -----------------
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
