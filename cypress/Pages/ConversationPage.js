import BasePage from "./BasePage";

class ConversationPage extends BasePage {

    // ==========================
    // Navigation
    // ==========================
    visit() {
        cy.contains('span.nav-link-text', 'Conversations').click();
    }
    SearchByName(name) {
        cy.get('input[placeholder="Name"]').type(name);
        this.clickSearch();
    }
    SearchBymobile(mobile) {
        cy.get('input[placeholder="Mobile Number"]').type(mobile);
        this.clickSearch();
    }
    SearchByChannel(channel) {
        cy.get('span').contains('Select Channel').click();
        cy.contains('li', channel).find('input[type="checkbox"]').check({ force: true });
        this.clickSearch();
    
    }
    SearchByInAction(action) {
        cy.get('[formcontrolname="inAction"]').click()
        cy.get('mat-option').contains(action).click()
        this.clickSearch();
    }
    SearchBySessionActivity(activity) {
        cy.get('[formcontrolname="sessionActive"]').click()
        cy.get('mat-option').contains(activity).click()
        this.clickSearch();
    }
    ClearSearch(name) {
        this.SearchByName(name);
        this.clickClear();
    }
    ClientFollowUp(TemplateName){
        cy.get('tbody tr').first().find('.mat-column-actions').contains('Client Follow Up').click()
        cy.get('[formcontrolname="templateId"]').click()
        cy.contains('li', TemplateName).find('input[type="checkbox"]').check({ force: true });
        cy.contains('span', 'send').click();


    }
    ClientFollowUpwithShow (TemplateName){
        cy.get('tbody tr').first().find('.mat-column-actions').contains('Client Follow Up').click()
        cy.get('[formcontrolname="templateId"]').click()
        cy.contains('li', TemplateName).find('input[type="checkbox"]').check({ force: true });
        cy.get('[formcontrolname="addToChat"]').click()
        
        cy.contains('span', 'send').click();


    }
    StartConversation(){
        cy.get('tbody tr').first().find('.mat-column-actions').contains('Start Conversation').click()     
        cy.get('[formcontrolname="searchAgent"]').click()
        cy.get('.agent-item').first().click() 
        cy.get('[formcontrolname="message"]').type('Hello, I am a test message')
        cy.get('button.btn-confirm').click()


    }
    ChatPage(){
        cy.get('tbody tr').first().find('.mat-column-actions').contains('Chat').click() 

    }
      exportChat(fixname) {
    cy.contains('Export PDF').click()

    const today = new Date().toLocaleDateString('en-CA').replace(/-/g, '');

    const fileName = `${fixname}.pdf`;

    cy.readFile(`cypress/downloads/${fileName}`, { timeout: 5000 })
      .should('exist');
  }

}

export default new ConversationPage();