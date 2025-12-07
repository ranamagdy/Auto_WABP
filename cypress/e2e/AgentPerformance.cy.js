import AgentPerformancePage from '../Pages/AgentPerformancePage';
import BasePage from '../Pages/BasePage';

describe('Agents Page Tests Using Fixtures', () => {


BasePage.init(AgentPerformancePage, 'AgentPerformance');  
  
  it('Should search by agent name', function () {
    const agentName = this.AgentPerformance.agentName;
    AgentPerformancePage.SearchByName(agentName);
    cy.get('td.mat-column-agentName').should('contain', agentName);


  });


  it('Should Clear the search', function () {
    const agentName = this.AgentPerformance.agentName; 
    AgentPerformancePage.SearchByName(agentName);
    BasePage.clickClear();
    cy.get('td.mat-column-agentName').should('contain', '');
  });


  it('Should Export', function () {
   
    BasePage.Export('Agent Performance Report');
  });

});
