import TermsRolesPage from "../Pages/Terms&RolesPage";
import LoginPage from '../pages/LoginPage';

describe('Agents Page Tests Using Fixtures', () => {

beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');
    

    // Perform login and wait for successful navigation
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      //cy.url().should('not.include', '/auth/login');
    });
TermsRolesPage.visitRole();
    cy.fixture('TermsRolesData').then((data) => {
  cy.wrap(data).as('TermsRolesData'); // 🔹 Store fixture data globally
});

  });


it('Should add a new Role successfully', function () {
    TermsRolesPage.AddNewRole(this.TermsRolesData.AddRoleName);
   
   cy.get('.mat-simple-snack-bar-content').should('contain', 'Role created successfully');
  });

  it('Should Search by Name Role successfully', function () {
          TermsRolesPage.openSearch();

    TermsRolesPage.SearchByName(this.TermsRolesData.AddRoleName);
   
   
       cy.get('.mat-row > .cdk-column-enName').should('contain',this.TermsRolesData.AddRoleName);
  });
  
  
   it('Should Edit the Role successfully', function () {
    TermsRolesPage.EditRole(this.TermsRolesData.EditRoleName)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Role updated successfully');

   
  });
  
   it('Should clear the search successfully', function () {
      TermsRolesPage.openSearch();

        TermsRolesPage.SearchByName(this.TermsRolesData.EditRoleName);
        TermsRolesPage.Clear(this.TermsRolesData.EditRoleName);
        cy.get('input[formcontrolname="roleName"]').should('have.value', '');

   
  });

    it('Should Delete the Role successfully', function () {
      TermsRolesPage.openSearch();
        TermsRolesPage.SearchByName(this.TermsRolesData.EditRoleName);
        TermsRolesPage.DeleteRole();
        cy.get('.mat-simple-snack-bar-content').should('contain', 'Role deleted successfully');

   
  });




});
