import BasePage from "./BasePage";

class GroupPage extends BasePage {

  // ==========================
  // Navigation
  // ==========================
  visit() {
    cy.contains('span.nav-link-text', 'Groups').click();
  }

  
  // ==========================
  // Group Form
  // ==========================


  enterGroupName(groupName) {
    cy.get('[formcontrolname="groupName"]').clear().type(groupName);
  }

  updateGroupAvailability(availability) {
    cy.contains('label', 'No').click();
  }

  selectGroupType(groupType) {
    cy.get('.mat-select-placeholder').click();
    cy.contains('mat-option', groupType).click();
  }

  // ==========================
  // Search
  // ==========================
  searchGroupByName(groupName) {
    cy.get('[formcontrolname="groupName"]').clear().type(groupName);
  }

  selectGroupTypeInSearch(groupType) {
    cy.get('#mat-select-value-1').click();
    cy.contains('.mat-option-text', groupType).click();
  }

  selectGroupAvailability(updateAvailability) {
     cy.get('#mat-select-value-3').click(); cy.get('.mat-option-text').contains(updateAvailability).click(); 
    }

  getSearchResults() {
    return cy.get('table');
  }

  // ==========================
  // Contacts
  // ==========================
  addContactsManually() {
    cy.contains('button', 'Add').click();
  }

  enterMobileNumber(mobileNumber) {
    cy.get('#phone').clear().type(mobileNumber);
  }

  searchByMobileNumber(mobileNumber) {
    cy.get('[formcontrolname="mobileNumber"]').clear().type(mobileNumber);
  }

  saveManualContacts() {
    cy.get('.mat-dialog-actions .btn').click();
  }

  // ==========================
  // File Upload
  // ==========================
  openFileTab() {
    cy.contains('button', 'File').click();
  }

  enterFileName(fileName) {
    cy.get('input[formcontrolname="fileName"]').clear().type(fileName);
  }

  uploadNormalFile(){
    cy.get('input[type="file"]').attachFile('1K Vodafone.xlsx');
    cy.wait(500);
  }

  uploadCustomFile(){
    cy.get('input[type="file"]').attachFile('1K Vodafone Custom.xlsx');
    cy.wait(500);
  }
}

export default new GroupPage();
