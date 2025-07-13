class RolesPage {
    visitRole() {
        // cy.visit('/pages/roles')
        cy.get('#cdk-accordion-child-1 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(2) > .subnav-link > .nav-link-text').click();
    }

    AddNewRole(Name) {
        cy.contains('span', 'Add Role').click();
        cy.get('input[formcontrolname="enName"]').type(Name);
        cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        cy.contains('span', 'Save').click();

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


    SearchByName(Name) {
        cy.get('input[formcontrolname="roleName"]').type(Name);
        cy.contains('span', 'Search ').click();


    }
    EditRole(Name) {
        cy.contains('span', 'Edit').first().click();
        cy.get('input[formcontrolname="enName"]').clear().type(Name);
        cy.get('#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        cy.get('#mat-checkbox-13 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        cy.contains('span', 'Save').click();

    }
    Clear() {

        cy.contains('span', 'Clear').click();
    }
    DeleteRole() {
        cy.contains('span', 'Delete').first().click();
        cy.get('#mat-dialog-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()

    }
}


export default new RolesPage();