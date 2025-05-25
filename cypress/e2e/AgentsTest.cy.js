import LoginPage from '../pages/LoginPage';
import AgentsPage from '../Pages/AgentsPage';

describe('Agents Page Tests Using Fixtures', () => {

beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');
    cy.fixture('categoryLogsData').as('data');

    // Perform login and wait for successful navigation
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      cy.url().should('not.include', '/auth/login');
    });


    // Now visit the category log page after login
    AgentsPage.visitAgent();
    cy.fixture('AgentsData').then((data) => {
  cy.wrap(data).as('AgentsData'); // 🔹 Store fixture data globally
});

  });

  
  it('Should add a new agent successfully', function () {
    AgentsPage.AddNewAgent(this.AgentsData.FullName ,this.AgentsData.email,this.AgentsData.integrationId);
   
   cy.get('.mat-simple-snack-bar-content').should(be.visible).should('contain', 'Agent created successfully');
  });
  

  it('Search by Name', function() {

    AgentsPage.SearchByName(this.AgentsData.FullName);
    cy.get('.mat-row > .cdk-column-fullName').should('contain','Ahmed');

  });
  
  it('Search by Email', function() {

    AgentsPage.SearchByEmail(this.AgentsData.email);
    cy.get('.mat-row > .cdk-column-email').should('contain','Ahmed@ntchnco.com');


  });

  it('Clear', function() {

    AgentsPage.SearchByEmail(this.AgentsData.email);
    AgentsPage.clearButton();
    cy.get('input[data-placeholder="Email"]').should('have.value', '');

  });
  

  it('Edit name and email' , function(){
    AgentsPage.SearchByName(this.AgentsData.FullName);

    AgentsPage.EditAgent(this.AgentsData.editname,this.AgentsData.editemail)
  })
    

  it ('should Be the user not active ',function(){
    AgentsPage.SearchByName(this.AgentsData.Agent.FullName);
    AgentsPage.changetoNotactive();
    cy.get('.mat-simple-snack-bar-content').should('contain','Admin user deactivated successfully')
  })

  it ('should Be the user active ',function(){
     AgentsPage.SearchByName(this.AgentsData.Agent.FullName);
     AgentsPage.changetoActive();
     cy.get('.mat-simple-snack-bar-content').should('contain','Admin user activated successfully')
   })
 
it('Delete The agent',function(){
  AgentsPage.SearchByEmail(this.AgentsData.Agent.editemail);
  AgentsPage.DeleteAgent();
  cy.get('.mat-simple-snack-bar-content').should('contain','Admin user deleted successfully')
})

 
});
