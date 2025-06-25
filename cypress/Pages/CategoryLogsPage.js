class CategoryLogsPage {
  visit() {
    cy.visit('https://qc-community.com/WABP_lib/AdminTool/pages/categoryLogs/index');
  }            

  getSearchInput() {
    return cy.get('input[formcontrolname="categoryLogName"]');
  }

  enterSearchName(name) {
     cy.get('input[placeholder="Name"]').type(name);
  }

  clickSearch() {
    cy.contains('button', 'Search', { matchCase: false }).click();
  }

  clickClear() {
    cy.contains('button', 'Clear', { matchCase: false }).click();
  }

  getSearchResults() {
    return cy.get('table'); // You can refine this if you have rows or columns
  }

  clickAdd() {
    cy.contains('button', 'Add', { matchCase: false }).click();
  }

  fillCategoryName(name) {
    cy.get('input[data-placeholder="Category Log Name"]').clear().type(name)
  }
  getCategoryName() {
    return cy.get('input[data-placeholder="Category Log Name"]')
  }

  clickSave() {
    cy.contains('button', 'Save', { matchCase: false }).click();
  }

  clickEditFirst() {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', 'Edit').click(); // Adjust if icon button
    });
  }

  clickDeleteFirst() {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', 'Delete').click(); // Adjust if icon
    });
  }

  confirmDelete() {
    cy.get('.mat-dialog-actions > .btn-black').click()
  }
}

export default new CategoryLogsPage();
