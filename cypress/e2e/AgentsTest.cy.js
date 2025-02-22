import LoginPage from '../pages/LoginPage';
import AgentsPage from '../Pages/AgentsPage';

describe('Agents Page Tests Using Fixtures', () => {

  beforeEach(function () {
   
      LoginPage.visit();
      cy.fixture('LoginData').then((data) => {
        this.LoginData = data; // ✅ Assign fixture data to "this"
      }).then(() => {
        LoginPage.visit();
        LoginPage.login(this.LoginData.admin.email, this.LoginData.admin.password);
      });
  
    cy.fixture('AgentsData').then((data) => {
      cy.wrap(data).as('AgentsData'); // 🔹 Store fixture data globally
    });
  
    AgentsPage.visitAgent();
  });
  
  it('Should add a new agent successfully', function () {
    AgentsPage.AddNewAgent(this.AgentsData.Agent.FullName,this.AgentsData.Agent.email);
   
   cy.get('.mat-simple-snack-bar-content').should('contain', 'Admin user created successfully');
  });
  

  it('Search by Name', function() {

    AgentsPage.SearchByName(this.AgentsData.Agent.FullName);
    cy.get('.mat-row > .cdk-column-fullName').should('contain','Ahmed');

  });
  it('Search by Email', function() {

    AgentsPage.SearchByEmail(this.AgentsData.Agent.email);
    cy.get('.mat-row > .cdk-column-email').should('contain','Ahmed@ntchnco.com');


  });

  it('Clear', function() {

    AgentsPage.SearchByEmail(this.AgentsData.Agent.email);
    AgentsPage.clearButton();


  });

  it('Edit name and email' , function(){
    AgentsPage.SearchByName(this.AgentsData.Agent.FullName);

    AgentsPage.EditAgent(this.AgentsData.Agent.editname,this.AgentsData.Agent.editemail)
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
