class ChannelsPage {
    visitChannelPage() {
        //cy.vitist('/pages/channels/index');
        cy.get('#cdk-accordion-child-1 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(3) > .subnav-link').click()

    }

    ChannelSync() {
        cy.contains('span', 'Sync Templates').first().click();
        cy.wait(60000);
        cy.get('.mat-simple-snack-bar-content').should('be.visible');
        cy.get('.mat-simple-snack-bar-content').should('contain', 'All WhatsApp Templates Synced Successfully');
    }
    changetoNotactive() {
        // cy.get('#cdk-accordion-child-1 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(3) > .subnav-link > .nav-link-text').click
        //  cy.get('#mat-slide-toggle-10 > .mat-slide-toggle-label > .mat-slide-toggle-bar')
        cy.get('#mat-slide-toggle-4 > .mat-slide-toggle-label > .mat-slide-toggle-content').first().click();

        cy.get('.custom-moda-style').should('be.visible');
        cy.get('.btn-black').click();

    }
    changetoActive() {
        cy.get('#mat-slide-toggle-4 > .mat-slide-toggle-label > .mat-slide-toggle-content').first().click();

        cy.get('.custom-moda-style').should('be.visible');
        cy.get('.btn-black').click();

    }
    CallCenterAvailability() {

        cy.get(':nth-child(1) > .cdk-column-actions > .btn-group-actions-list > :nth-child(2) > .btn > span').click();
        cy.get('.selected-list').should('be.visible').click();
        cy.contains('li.pure-checkbox', 'Available')
            .find('input[type="checkbox"]')
            .then(($available) => {
                if ($available.is(':checked')) {
                    cy.wrap($available).uncheck({ force: true });

                    cy.contains('li.pure-checkbox', 'Not Available')
                        .find('input[type="checkbox"]')
                        .check({ force: true });

                } else {
                    cy.wrap($available).check({ force: true });

                    cy.contains('li.pure-checkbox', 'Not Available')
                        .find('input[type="checkbox"]')
                        .uncheck({ force: true });
                }
            });

        cy.get('span').contains('Save').click()

    }


    AddCustomCallCenter(EnglishMessage,ArabicMessage) {
        cy.get(':nth-child(1) > .cdk-column-actions > .btn-group-actions-list > :nth-child(2) > .btn > span').click();
        cy.get('.selected-list').should('be.visible').click();
        cy.contains('li.pure-checkbox', 'Custom').click();
        cy.get('textarea[formcontrolname="enMessageHolder"]').clear().type(EnglishMessage);
        cy.get('textarea[formcontrolname="arMessageHolder"]').clear().type(ArabicMessage);
        // نحسب بكرة و بعد بكرة
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.getDate();

        const afterTomorrow = new Date();
        afterTomorrow.setDate(afterTomorrow.getDate() + 2);
        const afterTomorrowDay = afterTomorrow.getDate();

        // اختار "Holiday Date From" = بكرة
cy.get('.mat-form-field.ng-tns-c79-20 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator').click()
       cy.get('.mat-calendar-content').contains(new RegExp(`^\\s*${tomorrowDay}\\s*$`)) // يوم بكرة.click();

        // اختار "Holiday Date To" = بعد بكرة
        cy.get('.mat-form-field.ng-tns-c79-23 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator').click();

       cy.get('.mat-calendar-content').contains(new RegExp(`^\\s*${afterTomorrowDay}\\s*$`)) // يوم بعد بكرة.click();

       cy.get('span').contains('Add').click()








    }
    RemoveCustomCallCenter() {

    }



}
export default new ChannelsPage();