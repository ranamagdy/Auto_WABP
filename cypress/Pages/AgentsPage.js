class AgentsPage {
    visitAgent() {
        //cy.visit('/pages/agents');
        cy.get('#cdk-accordion-child-1 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(1) > .subnav-link').click();




    }
    AddNewAgent(FullName, email, integrationId = '') {
        cy.get('button.btn.btn-primary').click();

        cy.get('input[data-placeholder="Full Name"]').type(FullName);
        cy.get('input[formcontrolname="email"]').type(email);
        cy.get('span.ng-star-inserted').contains('Select Role').click();
        cy.get('#roleDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > .pure-checkbox > label').click();

        cy.get('body').then(($body) => {

            // Check if the Integration ID input exists in the DOM
            if ($body.find('input[data-placeholder="Integration Id"]').length > 0) {

                cy.get('input[data-placeholder="Integration Id"]')
                    .should('be.visible')
                    .invoke('val')
                    .then((existingValue) => {
                        if (!existingValue) {
                            cy.get('input[data-placeholder="Integration Id"]')
                                .type(integrationId, { force: true });
                        }
                        else {
                            cy.log('Integration ID already exists, skipping input');
                        }
                    });
            }
            else {
                cy.log('Integration ID field does not exist. Skipping input.');
            }
        });

        cy.get('#teamDD > .cuppa-dropdown > .selected-list > .c-btn').contains(' Select Team').click();
        cy.get(".ng-star-inserted").click;
        // cy.contains('li', 'EFB').find('input[type="checkbox"]').check({ force: true });
        cy.get('#teamDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1) > label').click();
        cy.get('button.btn.btn-black').click();
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
        cy.get('input[data-placeholder="Name"]').should('be.visible').type(Name)
        cy.get('span').contains('Search').click()

    }

    SearchByEmail(Email) {
        // Ensure the search section is visible
        cy.get('div.search-form-expand-wrapper').should('have.css', 'opacity', '1')

        // Now continue with input and search
        cy.get('input[data-placeholder="Email"]', { timeout: 10000 }).should('be.visible').type(Email)
        cy.contains('span', 'Search').click()
    }

    clearButton() {

        cy.get('.btn-transparent').click()
        cy.get('span').contains('Clear').click()

    }
    EditAgent(Name, Email) {

        cy.contains('span', 'Edit').first().click();
        cy.get('input[data-placeholder="Full Name"]').should('be.visible').clear().type(Name)
        cy.get('input[data-placeholder="agent email"]').should('be.visible').clear().type(Email)


        cy.get('span').contains('Save').click()
    }
    changetoNotactive() {
        cy.wait(1000);

        cy.contains('span.mat-slide-toggle-content', 'Active').should('be.visible').click();


        cy.get('#mat-dialog-title-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()

    }
    changetoActive() {
        cy.wait(1000);

        cy.contains('span.mat-slide-toggle-content', 'Not Active').should('be.visible').click();

        cy.get('#mat-dialog-title-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()


    }
    DeleteAgent() {
        cy.get(':nth-child(1) > .cdk-column-actions > .btn-group-actions-list > :nth-child(2) > .btn > span').click()
        cy.get('#mat-dialog-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()
    }
    ExportAgents() {
        cy.get('button[title="Export To Excel"]').click()


    }




}
export default new AgentsPage();