class CategoryLogsPage {
  visit() {
    cy.visit('./pages/categoryLogs/index');
  }            

openSearch() {
    cy.get('div.search-form-expand-wrapper').then($wrapper => {
        const isVisible = $wrapper.css('opacity') === '1';
        if (!isVisible) {
            cy.get('.card-head-btns-wrapper > .btn-black').click();
            // Wait for the panel to become visible after clicking
            cy.get('div.search-form-expand-wrapper', { timeout: 10000 })
              .should('have.css', 'opacity', '1');
        }
    });
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
