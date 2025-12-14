import BasePage from "./BasePage";

class PreMessagePage extends BasePage {
  
  // ==========================
  // Navigation
  // ==========================

  visit() {
    cy.contains('span.nav-link-text' , 'Pre-Messages').click();
  }

  // ==========================
  // Search
  // ==========================
  getSearchInput() {
    return cy.get('input[formcontrolname="message"]');
  }

  enterSearchMessage(editedMessage) {
    cy.get('[formcontrolname="message"]').clear().type(editedMessage);
  }


  // ==========================
  // Add / Edit Message
  // ==========================

  fillnewMessage(message) {
    cy.get('[formcontrolname="message"]').clear().type(message);
  }

  clickEditFirst() {
    cy.get('table tbody tr').first().within(() => {
      this.clickEdit();
    });
  }

 
}

export default new PreMessagePage();