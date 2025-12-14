import BasePage from "./BasePage";


class ClientFollowUp extends BasePage {

    // ========================
    // Visit Page
    // ========================

    visit() {
        cy.contains('a', 'Client Follow-Ups').click()
    }

    // ========================
    // Send Message
    // ========================

    SendMessage(ChannelName, TemplateName, MobileNumber) {
        cy.contains('span', 'Send Message').click();
        cy.contains('span', 'Select Channel').click();
        cy.contains('li', ChannelName).find('input[type="checkbox"]').check({ force: true });
        cy.contains('span', 'Select Template').click();
        cy.contains('li', TemplateName).find('input[type="checkbox"]').check({ force: true });
        cy.get('.ng-invalid > .iti > #phone').type(MobileNumber);
        cy.contains('span', 'send').click();
    }
   

    // ========================
    // Search by Mobile Number
    // ========================

    SearchByMobileNum(MobileNumber) {
        cy.get('#phone').type(MobileNumber);
        this.clickSearch();    
    }
     
    // ========================
    // Validate Empty Mandatory Fields
    // ========================

    ValidationMessages() {
        cy.contains('span', 'Send Message').click();
        cy.contains('span', 'send').click();
    }

    // ========================
    // Mobile Validation
    // ========================
    
    MobileValidation(ChannelName, TemplateName, MobileNumber) {
        cy.contains('span', 'Send Message').click();
        cy.contains('span', 'Select Channel').click();
        cy.contains('li', ChannelName).find('input[type="checkbox"]').check({ force: true });
        cy.contains('span', 'Select Template').click();
        cy.contains('li', TemplateName).find('input[type="checkbox"]').check({ force: true });
        cy.get('.ng-invalid > .iti > #phone').type(MobileNumber);
        cy.contains('span', 'send').click();


    }

}
export default new ClientFollowUp();
