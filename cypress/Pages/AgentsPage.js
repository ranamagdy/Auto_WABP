class AgentsPage {
    visitAgent(){
        cy.visit('https://qc-community.com/WABP_LIB/AdminTool/pages/agents/index')
    }
    AddNewAgent(FullName,email){
        cy.get('button.btn.btn-primary').click()

        cy.get('input[data-placeholder="Full Name"]').type(FullName)

        cy.get('input[formcontrolname="email"]').type(email)
        cy.get('span.ng-star-inserted').contains('Select Role').click()

        cy.contains('li', 'Raya role').find('input[type="checkbox"]').check({ force: true });

        cy.get('input[data-placeholder="Integration Id"]').type(FullName)


        cy.get('#roleDD').click(); 
        cy.get('.lazyContainer > :nth-child(1) > label').click(); // 🔹 Click to select "Admin"
        cy.contains('label.mat-radio-label', 'Male').click();


        cy.get('.btn').click();

    }
    
    SearchByName(Name){
        cy.get('#mat-input-0').type(Name);
        cy.get('.btn-black > span').click();
    }
    SearchByEmail(Email){

        cy.get('#mat-input-1').type(Email);
        cy.get('.btn-black > span').click();
    }
    clearButton(){
        
        cy.get('.btn-transparent').click()
        

    }
    EditAgent(editName,editEmail){

        cy.contains('span', 'Edit').first().click();


        cy.get('#mat-input-2').clear().type(editName);
        cy.get('#mat-input-3').clear().type(editEmail);
        cy.get('.btn > span').click();
    }
    changetoNotactive(){
        cy.get('.mat-slide-toggle-thumb').first().click();

        cy.get('#mat-dialog-title-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()

    }
    changetoActive(){
        cy.get('.mat-slide-toggle-thumb').first().click();

        cy.get('#mat-dialog-title-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()

    }
    DeleteAgent()
    {
        cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > span').first().click()
        cy.get('#mat-dialog-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()
        cy.get('.mat-simple-snack-bar-content')
    }



  
}
export default new AgentsPage();