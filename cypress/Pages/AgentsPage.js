class AgentsPage {
    visitAgent(){
        cy.visit('https://qc-community.com/WABP_LIB/AdminTool/pages/agents')
    }
    AddNewAgent(FullName,email,integrationId){
        cy.get('button.btn.btn-primary').click()

        cy.get('input[data-placeholder="Full Name"]').type(FullName)

        cy.get('input[formcontrolname="email"]').type(email)
        cy.get('span.ng-star-inserted').contains('Select Role').click()

        cy.contains('li', 'Raya role').find('input[type="checkbox"]').check({ force: true });

        cy.get('input[data-placeholder="Integration Id"]').type(integrationId)

       cy.get('#teamDD > .cuppa-dropdown > .selected-list > .c-btn').contains(' Select Team').click()
        
        cy.contains('li', 'Motor Renewals Team (Cairo)').find('input[type="checkbox"]').check({ force: true });
        cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();


        cy.get('button.btn.btn-black').click()


    }
    
    SearchByName(Name){
        cy.get('input[data-placeholder="Name"]').should('be.visible').type(Name)
        cy.get('span').contains('Search').click()

    }
    SearchByEmail(Email){

        cy.get('input[data-placeholder="Email"]').should('be.visible').type(Email)
        cy.get('span').contains('Search').click()
    }

    clearButton(){
        
        cy.get('.btn-transparent').click()
        cy.get('span').contains('Clear').click()

    }
    EditAgent(Name,Email){

        cy.contains('span', 'Edit').first().click();
        cy.get('input[data-placeholder="Name"]').should('be.visible').type(Name)
        cy.get('input[data-placeholder="Email"]').should('be.visible').type(Email)


        cy.get('span').contains('Save').click()
    }
    changetoNotactive(){
        cy.get('mat-slide-toggle-content').contains('Active').first().click();

        cy.get('#mat-dialog-title-0').should('be.visible');
        cy.get('btn btn-black ng-star-inserted').contains('Ok').click()

    }
    changetoActive(){
        cy.get('mat-slide-toggle-content').contains('Not Active').first().click();

     cy.get('#mat-dialog-title-0').should('be.visible');
      cy.get('btn btn-black ng-star-inserted').contains('Ok').click()


    }
    DeleteAgent()
    {
        cy.contains('span', 'delete').first().click()
        cy.get('#mat-dialog-0').should('be.visible');
        cy.get('btn btn-black ng-star-inserted').contains('Ok').click()
        cy.get('.mat-simple-snack-bar-content')
    }



  
}
export default new AgentsPage();