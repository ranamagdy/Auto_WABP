import AgentsPage from '../Pages/AgentsPage';
import BasePage from '../Pages/BasePage';

describe('Agents Page Tests Using Fixtures', () => {
  
  // Load fixture & login, navigate to page
  BasePage.init(AgentsPage, 'AgentsData');

  it('Should add a new agent successfully', function () {
    const dynamicFullName = BasePage.generateDynamicName(this.AgentsData.FullName);
    const dynamicEmail = BasePage.generateDynamicEmail(this.AgentsData.email);
    const integrationId = Math.floor(1000 + Math.random() * 9000).toString();
    AgentsPage.AddNewAgent(dynamicFullName, dynamicEmail, integrationId);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent created successfully');

  });


  it('Search by Name', function () {

    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.FullName);
    
    cy.get('.mat-row > .cdk-column-adminName')
      .should('contain', this.AgentsData.FullName);

  });

  it('Search by Email', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByEmail(this.AgentsData.email);
    
    cy.get('.mat-row > .cdk-column-email')
      .should('contain', this.AgentsData.email);


  });

  it('Clear', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.FullName);
    AgentsPage.SearchByEmail(this.AgentsData.email);
    AgentsPage.clickClear();
    
    cy.get('input[data-placeholder="Name"]')
      .should('have.value', '');
    
      cy.get('input[data-placeholder="Email"]')
      .should('have.value', '');

  });


  it('Edit name and email', function () {
    const dynamicEditName = BasePage.generateDynamicName(this.AgentsData.editname);
    const dynamicEditEmail = BasePage.generateDynamicEmail(this.AgentsData.editemail);
    AgentsPage.EditAgent(dynamicEditName, dynamicEditEmail);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent updated successfully');

  });



  it('should Be the user not active ', function () {

    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.editname);
    cy.wait(1000);
    AgentsPage.changetoNotactive();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent deactivated successfully')
  })

  it('should Be the user active ', function () {

    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.editname);
    cy.wait(1000);
    AgentsPage.changetoActive();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent activated successfully')
  })

  it('Delete The agent', function () {
    AgentsPage.deleteFirstRow();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent deleted successfully')
  })

  it('should export the Excel file', () => {
    // Click the Export to Excel button
    AgentsPage.export('Agents');
  })


});
