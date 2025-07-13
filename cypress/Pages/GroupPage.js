class GroupPage {

    visit () {
        cy.visit ('./pages/groups/index')
    }
    clickAdd() {
         cy.contains('button', 'Add', { matchCase: false }).click();


    }
   
clickAddcontacts() {
         cy.contains('button', 'Add', { matchCase: false }).click();


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

    enterGroupName(groupName) {
    cy.get('[formcontrolname="groupName"]').clear().type(groupName);
   
    }

    enterGroupName(updateName) {
    cy.get('[formcontrolname="groupName"]').clear().type(updateName);
   
    }
    updateAvailabilty () {

    cy.contains('label', 'No').click();

    }
   
   
    selectGroupType(groupType) {
    cy.get('.mat-select-placeholder').click();

    cy.get('mat-option').contains(groupType).click();
  }
    
   clickSave() {
    cy.contains('button', 'Save', { matchCase: false }).click();
  }

  clickEdit() {
    cy.contains('span.ng-tns-c174-2', 'Edit').click();

  }
   
   searchGroupByName(groupName) {
  cy.get('[formcontrolname="groupName"]').clear().type(groupName);
}

AddContactsmanually() {
  cy.get('.btn-primary').click();
}

ClickSaveFormanuallycontacts() {
  cy.get('.mat-dialog-actions > .btn');
}

}
export default new GroupPage();
