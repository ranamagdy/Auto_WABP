import BasePage from "./BasePage";


class RolesPage extends BasePage {
    
    // ==========================
    // Navigation
    // ==========================

    visit() {
        // cy.visit('/pages/roles')
        cy.contains('span.nav-link-text', 'Terms & Roles').click();
    }


    // ==========================
    // Add New Role
    // ==========================
    AddNewRole(Name) {
        this.clickAddNew();                 //super is used to Call the parent constructor, Call a method from the parent class.
        cy.get('input[formcontrolname="enName"]').type(Name);
        cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        this.clickSave();


    }


    // ==========================
    // Search
    // ==========================

    SearchByName(Name) {
        cy.get('input[formcontrolname="roleName"]').type(Name);
        this.clickSearch();
    }


    // ==========================
    // Edit Role
    // ==========================

    EditRole(Name) {
        this.clickEdit();
        cy.get('input[formcontrolname="enName"]').clear().type(Name);
        cy.get('#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        cy.get('#mat-checkbox-13 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        this.clickSave();

    }


}


export default new RolesPage();