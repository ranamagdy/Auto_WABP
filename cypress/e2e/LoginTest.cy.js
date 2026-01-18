///<refrence types="cypress" >
import LoginPage from "../Pages/LoginPage";
describe('Happy Scenario for Login ', () => {
    beforeEach(() => {
        cy.fixture('LoginData').then((data) => {
            cy.wrap(data).as('LoginData'); // Store fixture data for later use
        });
         LoginPage.visit();

    });

    it('Should log in successfully with valid credentials', function () {
       
        LoginPage.login(this.LoginData.admin.email, this.LoginData.admin.password);
        cy.url()
          .should('include', 'pages');
    });


    it('A validation message should display when login with Invalid Email', function () {
       
        LoginPage.login(this.LoginData.InvalidEmail, this.LoginData.admin.password);
        cy.get('.mat-simple-snack-bar-content')
          .should('contain','Invalid email or password')
    });

       it('A validation message should display when login with Invalid Email', function () {
    
        LoginPage.login(this.LoginData.admin.email, this.LoginData.InvalidPassword);

        cy.get('.mat-simple-snack-bar-content')
          .should('contain','Invalid email or password')
    });

    it('A validation message should display when enter invalid pattern ', function () {
       
        LoginPage.login(this.LoginData.InvalidPattern, this.LoginData.admin.password);
        cy.contains('span',' Invalid Email Pattern')
          .should('contain','Invalid Email Pattern')
    });
    
        it('A validation message should display when enter empty data  ', function () {

        LoginPage.LoginWithEmptydata('','')
        cy.get('#mat-error-0 > :nth-child(1)')
          .should('contain','Please Enter ')
    });
    
});


