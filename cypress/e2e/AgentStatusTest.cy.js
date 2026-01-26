import AgentStatusPage from '../Pages/AgentStatusPage';
import BasePage from '../Pages/BasePage';

describe('Agents Status Page Tests Using Fixtures', () => {

  // Load fixture & login, navigate to page
  BasePage.init(AgentStatusPage, 'AgentStatusData');

  it('Should open Agent Status page', () => {
  AgentStatusPage.assertPageNavigation('AdminStatuses');  // dynamically asserts URL
  });

  it('Should Add New Active Status Successfully', function () {
    const dynamicStatusName = BasePage.generateDynamicName(this.AgentStatusData.RandomStatus);
    AgentStatusPage.addNewStatus('Active',dynamicStatusName);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'The agent status has been created successfully.');
  });

  it('Should not allow duplicate Active agent status name', function () {

     const duplicateName = BasePage.generateDynamicName(this.AgentStatusData.RandomStatus);
     AgentStatusPage.addNewStatus('Active', duplicateName);
     AgentStatusPage.addNewStatus('Active', duplicateName);

     cy.get('.mat-simple-snack-bar-content')
       .should('contain', "The agent's status already exists.");
});


  it('Should Add New Inactive Status Successfully', function () {
    const dynamicStatusName = BasePage.generateDynamicName(this.AgentStatusData.RandomStatus);
    AgentStatusPage.addNewStatus('Inactive',dynamicStatusName);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'The agent status has been created successfully.');
  });

  it('Should not allow duplicate Inactive agent status name', function () {

     const duplicateName = BasePage.generateDynamicName(this.AgentStatusData.RandomStatus);
     AgentStatusPage.addNewStatus('Inactive', duplicateName);
     AgentStatusPage.addNewStatus('Inactive', duplicateName);

     cy.get('.mat-simple-snack-bar-content')
       .should('contain', "The agent's status already exists.");
});


  it('Should show validation messages when clicking Save without filling mandatory fields', () => {
      AgentStatusPage.clickAddNew();
      AgentStatusPage.clickSave();
  
      const validationMessages = [
        'Please Select Parent Status',
        'Please Enter Status Name',
        'Please Select Status Color'
      ];
  
      validationMessages.forEach(message => {
        cy.contains(message).should('be.visible');
      });
  
    });


  it('Should Edit a Status Successfully', function () {
    const dynamicEditName = BasePage.generateDynamicName(this.AgentStatusData.RandomStatus);

    AgentStatusPage.openSearch();
    AgentStatusPage.SearchByName(this.AgentStatusData.RandomStatus);
    AgentStatusPage.EditStatus(dynamicEditName);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'The agent status has been updated successfully.');
  });

  it('Should Search By Status Name Successfully', function () {
    AgentStatusPage.openSearch();
    AgentStatusPage.SearchByName(this.AgentStatusData.StatusnameSearch);

    cy.get('td.mat-column-statusName')
      .contains(this.AgentStatusData.StatusnameSearch)
      .should('be.visible');
  });

  it('Should Search By Active Status Successfully', function () {
    AgentStatusPage.openSearch();
    AgentStatusPage.SearchByActiveStatus();

    cy.get('td.mat-column-parentName')
      .contains('Active')
      .should('be.visible');
  });

  it('Should Search By Inactive Status Successfully', function () {
    AgentStatusPage.openSearch();
    AgentStatusPage.SearchByInActiveStatus();

    cy.get('td.mat-column-parentName')
      .contains('Inactive')
      .should('be.visible');
  });

  it('Should Clear the Search Successfully', function () {
    AgentStatusPage.openSearch();
    AgentStatusPage.SearchByName(this.AgentStatusData.EditStatus);
    AgentStatusPage.clickClear();

    cy.get('input[data-placeholder="Name"]')
      .should('have.value', '');
  });

  it('Should Set an Online Status', function () {
    AgentStatusPage.SetActiveStatus();

    cy.get('.agent-status-button-inner')
      .should('contain', 'Online');
  });

  it('Should Set an Offline Status', function () {
    AgentStatusPage.SetInActiveStatus();

    cy.get('.agent-status-button-inner')
      .should('contain', 'Offline');
  });

  it('Should Not Delete Status That Exists in Agent History', function () {
    AgentStatusPage.SetInActiveStatus();
    AgentStatusPage.openSearch();
    AgentStatusPage.SearchByName(this.AgentStatusData.InActiveStatus);

    AgentStatusPage.deleteFirstRow();

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Cannot delete status as it exists in agents\' history.');
  });

  it('Should Delete Status Successfully', function () {
    AgentStatusPage.deleteFirstRow();

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'The agent status has been deleted successfully.');
  });

});
