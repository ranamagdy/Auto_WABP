///<refrence types="cypress" >
class LoginPage {
    
    // ==========================
    // Navigation
    // ==========================
    visit() {
        cy.visit('/auth/login')
    }

    // ==========================
    // Login Form
    // ==========================

    login(email, password) {
        cy.login(email, password);
    }

    
    LoginWithEmptydata(email, password) {

        if (email) {
            cy.get('input[formcontrolname="userName"]').clear().type(email);
        }
        if (password) {
            cy.get('input[formcontrolname="password"]').clear().type(password);
        }
        cy.get('.btn').click()
    }
    
}
export default new LoginPage();