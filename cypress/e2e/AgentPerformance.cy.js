import AgentPerformancePage from '../Pages/AgentPerformancePage';
import BasePage from '../Pages/BasePage';

describe('Agent Performance Page Tests Using Fixtures', () => {

  BasePage.init(AgentPerformancePage, 'AgentPerformance');
  

  
  it('Should open Agent Performance page', () => {
  AgentPerformancePage.assertPageNavigation('agentPerformance');  // dynamically asserts URL

});
  
  
  it('Should search by agent name', function () {
    const agentName = this.AgentPerformance.agentName;
    AgentPerformancePage.SearchByName(agentName);

    cy.get('td.mat-column-agentName')
      .should('contain', agentName);
  });


  it('Should clear the search', function () {

    const agentName = this.AgentPerformance.agentName;
    AgentPerformancePage.SearchByName(agentName);
    AgentPerformancePage.clickClear();

    cy.get('input[formcontrolname="agentName"]')
      .should('have.value', ''); 

  });


  it('Should Export', function () {
    AgentPerformancePage.export('Agent Performance Report');
  });

});
