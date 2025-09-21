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


    AddCustomCallCenter(EnglishMessage, ArabicMessage) {

        cy.get(':nth-child(1) > .cdk-column-actions > .btn-group-actions-list > :nth-child(2) > .btn > span').click();

        // اختار نوع القناة: Custom
        cy.get('.selected-list').should('be.visible').click();
        cy.contains('li.pure-checkbox', 'Custom').click();

        // اكتب الرسائل
        cy.get('textarea[formcontrolname="enMessageHolder"]').clear().type(EnglishMessage);
        cy.get('textarea[formcontrolname="arMessageHolder"]').clear().type(ArabicMessage);

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const tomorrowDay = tomorrow.getDate().toString();


        // اختار "Holiday Date From" = بكرة
        // Click the first datepicker toggle (e.g., "Holiday From")
        cy.get('button[aria-label="Open calendar"]').eq(0).click();

        cy.get('ngx-mat-calendar', { timeout: 5000 }).should('be.visible');


        cy.get('.mat-calendar-body-cell-content').contains(new RegExp(`^\\s*${tomorrowDay}\\s*$`)).click({ force: true }); // يوم بكرة.click();
        cy.get('mat-icon').contains('done')
            .parents('button')
            .click({ force: true });


        // اختار "Holiday Date To" = بعد بكرة
        cy.get('button[aria-label="Open calendar"]').eq(1).click();
        cy.get('ngx-mat-calendar', { timeout: 5000 }).should('be.visible');

        cy.get('.mat-calendar-body-cell-content').contains(new RegExp(`^\\s*${afterTomorrowDay}\\s*$`)).click({ force: true }); // يوم بعد بكرة.click();
        cy.get('mat-icon').contains('done')
            .parents('button')
            .click({ force: true });

        cy.get('span').contains('Add').click()
        cy.get('span').contains('Save').click()

        cy.contains('Holiday From Date Time')
            .parents('mat-form-field')
            .find('button[aria-label="Open calendar"]')
            .click();

        // Step 2: Ensure the calendar is open and move to right month if needed
        cy.get('.mat-calendar-body-cell-content').then(($cells) => {
            if (!$cells.text().includes(day.toString())) {
                cy.get('.mat-calendar-next-button').click(); // go to next month
            }
        });

        // Step 3: Select day (with flexible regex for padding spaces)
        cy.get('.mat-calendar-body-cell-content')
            .contains(new RegExp(`^\\s*${day}\\s*$`))
            .should('be.visible')
            .click({ force: true });


        // Step 4: Fill in hour and minute
        cy.get('input[formcontrolname="hour"]').clear().type(hour.toString().padStart(2, '0'));
        cy.get('input[formcontrolname="minute"]').clear().type(minute.toString().padStart(2, '0'));

        // Step 5: AM/PM toggle if needed
        cy.get('button.mat-stroked-button').then(($btn) => {
            if (!$btn.text().includes(ampm)) {
                cy.wrap($btn).click();
            }
        });

        // Step 6: Click Done icon
        cy.get('button mat-icon').contains('done').parents('button').click({ force: true })
        // اضغط على زر Add
        cy.contains('span', 'Add').click();
        cy.contains('span', 'Save').click();





    }

    RemoveCustomCallCenter() {
        cy.get(':nth-child(1) > .cdk-column-actions > .btn-group-actions-list > :nth-child(2) > .btn > span').click();
        cy.get('ul.btn-group-actions-list li').first().find('button').click();
        cy.get('mat-dialog-container#mat-dialog-0').contains('button', 'Delete').click();
        cy.get('span').contains('Save').click()




    }



}
export default new ChannelsPage();