import ForgotPassword from '../Pages/ForgotPasswordPage';

describe('Forgot Password Page Tests', () => {

   beforeEach(function () {
        cy.fixture('ForgotPasswordData').then((data) => {
            this.ForgotPasswordData = data;
        });
    });

    it('Should navigate to the forgot password page', () => {
        ForgotPassword.visit();
        cy.url().should('include', 'ForgotPassword');
    });

    it('Should submit the forgot password form with a valid email', function () {
        ForgotPassword.visit();
        ForgotPassword.submitForgotPassword(this.ForgotPasswordData.email);
        cy.contains('h1', 'Check your email').should('be.visible');
    });
    it('Should navigate back to the login page', function () {
        ForgotPassword.visit();
        ForgotPassword.BackToLogin();
       cy.contains('h1', 'Login').should('be.visible');
    });

});