import BasePage from "./BasePage";  

class SMSTemplate extends BasePage {


    // ==========================
    // Navigation
    // ==========================
    visit() {
        cy.contains('span.nav-link-text', 'SMS Templates').click();
    }
    // ==========================
    // SMS Template Form
    // ==========================
    AddNewTemplate(Name, Body) {
        this.clickCreate();            //super is used to Call the parent constructor, Call a method from the parent class.
        cy.get('.mat-form-field-flex').type(Name)
        cy.get('span').contains('Select Channel').click();
        cy.get('.pure-checkbox > label').click()

        cy.get('#body').type(Body)
        this.clickSave();
    }

    // ==========================
    // Search
    // ==========================
   
    SearchByName(Name) {
        cy.get('input[formcontrolname="templateName"]').type(Name);
        this.clickSearch();
    }

    SearchByAvailablity() {
        cy.get(':nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').click();
        cy.get('span').contains(' Yes ').click();
        this.clickSearch();

    }
    SearchByChannel() {
        cy.get('mat-select[formcontrolname="channelId"]').click();
        cy.get('mat-option .mat-option-text').contains('SMS').click();
        this.clickSearch();
    }
    
    // ==========================
    // Availability Change
    // ==========================
    ChangeToNotAvailable() {
        // استهداف أول صف في الجدول - عمود Availability
        cy.get('table tbody tr')
            .first()
            .find('mat-slide-toggle input[type="checkbox"]')
            .uncheck({ force: true });


        cy.get('.mat-dialog-container').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click();
    }
    
    ChengeToAvailable() {
        cy.get('table tbody tr')
            .first()
            .find('mat-slide-toggle input[type="checkbox"]')
            .check({ force: true });
        cy.get('.mat-dialog-actions > .btn-black').click();
        //cy.get('#mat-dialog-0').should('be.visible').click();

    }
    

}
export default new SMSTemplate();