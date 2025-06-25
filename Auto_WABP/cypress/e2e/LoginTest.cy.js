///<refrence types="cypress" >
import LoginPage from "../pages/LoginPage";
describe('Happy Scenario for Login ', () => {
    beforeEach(() => {
        cy.fixture('LoginData').then((data) => {
            cy.wrap(data).as('LoginData'); // Store fixture data for later use
        });
    });

    it('Should log in successfully with valid credentials', function () {
        LoginPage.visit();

        // Use fixture data inside the test
        LoginPage.login(this.LoginData.admin.email, this.LoginData.admin.password);

        // Verify successful login
        cy.url().should('include', 'pages');
    });
});


