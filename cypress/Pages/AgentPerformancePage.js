import 'cypress-file-upload';
import BasePage from "./BasePage";

class AgentPerformance extends BasePage {

  // ==========================
  // Navigation
  // ==========================
  visit() {
    cy.get('span.nav-link-text').contains('Agent Performance')
      .click();
  }

  // ==========================
  // Search by Agent Name
  // ==========================
  SearchByName(agentName) {

    cy.get('input[formcontrolname="agentName"]')
      .clear()
      .type(agentName);

    this.clickSearch();
  }


}

export default new AgentPerformance();
