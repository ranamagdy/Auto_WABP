import BasePage from "./BasePage";

class CategoryLogsPage extends BasePage {
  
  // ==========================
  // Navigation
  // ==========================

  visit() {
    cy.get('span.nav-link-text').contains('Log Category Type').click();
  }            

  // ==========================
  // Search 
  // ==========================

  enterSearchName(name) {
     cy.get('input[placeholder="Name"]').type(name);
  }

  // ==========================
  // Buttons
  // ==========================

  
 

  clickSave() {
    super.clickSave();
  }

  clickEditFirst() {
    cy.get('table tbody tr').first().within(() => {
      super.clickEdit() // Adjust if icon button
    });
  }

  // ==========================
  // Search Results
  // ==========================

  getSearchResults() {
    return cy.get('table'); // You can refine this if you have rows or columns
  }


  getSearchInput() {
    return cy.get('input[formcontrolname="categoryLogName"]');
  }
  // ==========================
  // Form Fields
  // ========================== 
  fillCategoryName(name) {
    cy.get('input[data-placeholder="Category Log Name"]').clear().type(name)
  }
  getCategoryName() {
    return cy.get('input[data-placeholder="Category Log Name"]')
  }


}

export default new CategoryLogsPage();
