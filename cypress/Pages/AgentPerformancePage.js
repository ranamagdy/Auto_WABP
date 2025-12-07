import 'cypress-file-upload';
import BasePage from "./BasePage";


class AgentPerformance extends BasePage {

//______________________________________________________Methods_________________________________________________________________
visit() {
    cy.contains('span.nav-link-text', 'Agent Performance').click();
  }

SearchByName(agentName) {
    cy.get('input[formcontrolname="agentName"]').type(agentName);
    this.clickSearch();
  }

  
  clearFilters() {
    this.clickClear();
  }


}

export default new AgentPerformance();