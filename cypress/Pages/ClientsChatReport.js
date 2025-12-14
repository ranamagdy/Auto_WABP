import BasePage from "./BasePage";

class ClientsChatReport extends BasePage {
    
    // ==========================
    // Navigation
    // ==========================
    
    visit() {
        cy.contains('span.nav-link-text' , 'Clients Chat').click();
        
    }


    // ==========================
    // Search
    // ==========================
    SearchByMobileNumber(MobileNumber) {
        cy.get('#phone').type(MobileNumber);
        this.clickSearch();
    }
    
    SearchByClientName(ClientName) {
        cy.get('input[formcontrolname="clientName"]').type(ClientName);
        this.clickSearch();

    }
    SearchByChannelType() {
        cy.get('#mat-select-value-1').click()
        cy.get('mat-option .mat-option-text').contains('WhatsApp').click();
        this.clickSearch();


    }
    SerchByAgentName(AgentName) {
        cy.get('input[formcontrolname="agentName"]').type(AgentName);
        this.clickSearch();
        cy.contains('span' , 'View Support History').click();
        



    }
    
    // ============
    // Search
    // ============

    ViewChat() {
        cy.get('.btn-group-actions-list .btn').first().click();

    }
    ViewSupportHistory() {
     cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > span').click();


    }
}
export default new ClientsChatReport();
