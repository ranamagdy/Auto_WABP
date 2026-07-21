import BasePage from "./BasePage";

class ForgotPassword  extends BasePage {
    // ==========================       
    visit() {
        cy.visit('/auth/login')
        cy.contains('a', 'Forgot Password?').click();
    }
    submitForgotPassword(email) {
        cy.get('#Email').type(email);
        cy.get('button[type="submit"]').click();
    }
}
export default new ForgotPassword();