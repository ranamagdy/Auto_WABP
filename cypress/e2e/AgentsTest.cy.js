import LoginPage from '../pages/LoginPage';
import AgentsPage from '../Pages/AgentsPage';

describe('Agents Page Tests Using Fixtures', () => {

  beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');


    // Perform login and wait for successful navigation
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      cy.url().should('not.include', '/auth/login');
    });


    AgentsPage.visitAgent();
    cy.url().should('include', '/pages/agents'); // ✅ expected path
    cy.fixture('AgentsData').then((data) => {
      cy.wrap(data).as('AgentsData'); // 🔹 Store fixture data globally
    });

  });



  it('Should add a new agent successfully', function () {
    const integrationId = Math.floor(1000 + Math.random() * 9000).toString();

    AgentsPage.AddNewAgent(this.AgentsData.FullName, this.AgentsData.email, integrationId);

    cy.get('.mat-simple-snack-bar-content').should('contain', 'Agent created successfully');
  });

  it('Search by Name', function () {

    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.FullName);
    cy.get('.mat-row > .cdk-column-adminName').should('contain', this.AgentsData.FullName);

  });

  it('Search by Email', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByEmail(this.AgentsData.email);
    cy.get('.mat-row > .cdk-column-email').should('contain', this.AgentsData.email);


  });

  it('Clear', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByEmail(this.AgentsData.email);
    AgentsPage.clearButton();
    cy.get('input[data-placeholder="Email"]').should('have.value', '');

  });


  it('Edit name and email', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.FullName);
   AgentsPage.EditAgent(this.AgentsData.editname, this.AgentsData.editemail)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Agent updated successfully');
  })


  it('should Be the user not active ', function () {
   
    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.editname);
     cy.wait(1000);
    AgentsPage.changetoNotactive();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Agent deactivated successfully')
  })

  it('should Be the user active ', function () {
        
    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.editname);
    cy.wait(1000);
    AgentsPage.changetoActive();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Agent activated successfully')
  })

  it('Delete The agent', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByEmail(this.AgentsData.editemail);
    AgentsPage.DeleteAgent();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Agent deleted successfully')
  })

  it('should export the Excel file', () => {
    // Click the Export to Excel button
    AgentsPage.ExportAgents();

    // Wait for the file to be downloaded
const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
const downloadedFilename = `Agents_${today}.xlsx`;

cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
  })


});
