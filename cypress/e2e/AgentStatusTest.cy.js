import AgentStatus from '../Pages/AgentStatusPage';
import BasePage from '../Pages/BasePage';


describe('Agents Status Page Tests Using Fixtures', () => {

  BasePage.init(AgentStatus, 'AgentStatusData');

  it('Should Add New Active Status Successfully ', function () {

    const dynamiStatusName = BasePage.generateDynamicName(this.AgentStatusData.RandomStatus);
    AgentStatus.AddActiveNewStatus(dynamiStatusName);
    cy.get('.mat-simple-snack-bar-content').should('contain', 'The agent status has been created successfully.');


  })


  it('Should Add New InActive Status Successfully ', function () {
    const dynamiStatusName = BasePage.generateDynamicName(this.AgentStatusData.RandomStatus);
    AgentStatus.AddInActiveNewStatus(dynamiStatusName);
    cy.get('.mat-simple-snack-bar-content').should('contain', 'The agent status has been created successfully.');


  })

  it('Should Edit a status Successfully', function () {
     const dynamicEditName = BasePage.generateDynamicName(this.AgentStatusData.RandomStatus);


      BasePage.openSearch();
      AgentStatus.SearchByName(this.AgentStatusData.RandomStatus)
      AgentStatus.EditStatus(dynamicEditName)
      cy.get('.mat-simple-snack-bar-content').should('contain', 'The agent status has been updated successfully.');
    
  })

  it('Should Search By status name Sucessfully ', function () {
    BasePage.openSearch();
    AgentStatus.SearchByName(this.AgentStatusData.EditStatus)
    cy.get('td.mat-column-statusName').contains(this.AgentStatusData.EditStatus).should('be.visible');

  })
  it('Should Search By Active status  Sucessfully ', function () {
    BasePage.openSearch();
    AgentStatus.SearchByActiveStatus()
    cy.get('td.mat-column-parentName').contains('Active').should('be.visible');


  })
  it('Should Search By Inactive status Sucessfully ', function () {
    BasePage.openSearch();
    AgentStatus.SearchByInActiveStatus()
    cy.get('td.mat-column-parentName').contains('Inactive').should('be.visible');

  })

  it('Should Clear the search Successfully ', function () {
    BasePage.openSearch();
    AgentStatus.SearchByName(this.AgentStatusData.EditStatus)
    BasePage.clickClear();
    cy.get('input[data-placeholder="Name"]').should('have.value', '');

  })

  it.only('Should set an Online Status', function () {
    AgentStatus.SetActiveStatus()
  })
  it('Should set an Offliine Status', function () {
    AgentStatus.SetInActiveStatus()
  })
  it('Delete Status That set before and not allowed to delete ', function () {
    AgentStatus.SetInActiveStatus()
    BasePage.openSearch();
    AgentStatus.SearchByName(this.AgentStatusData.InActiveStatus)
    BasePage.Delete();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Cannot delete status as it exists in agents\' history.');


  })

  it('Delete Status Successfully ', function () {
    BasePage.Delete();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'The agent status has been deleted successfully.');



  })

  
});
