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
            cy.get('#UserName').clear().type(email);
        }
        if (password) {
            cy.get('#Password').clear().type(password);
        }
        cy.get('.login-btn').click()
    }
    
}
export default new LoginPage();