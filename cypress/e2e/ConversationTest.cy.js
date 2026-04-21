import ConversationPage from '../Pages/ConversationPage';
import BasePage from '../Pages/BasePage';

describe('Conversation Page Tests Using Fixtures', () => {
    BasePage.init(ConversationPage, 'ConversationData');    
    it('Should open Conversation page', () => {
         ConversationPage.assertPageNavigation('conversation');  // dynamically asserts URL    
    });

    it('Should search by Name', function () {
        ConversationPage.openSearch();
        ConversationPage.SearchByName(this.ConversationData.Name);
        cy.get('.mat-column-userName').should('contain', this.ConversationData.Name)
    });
    it('Should search by Mobile Number', function () {
        ConversationPage.openSearch();
        ConversationPage.SearchBymobile(this.ConversationData.MobileNumber);
        cy.get('.mat-column-mobileNumber').should('contain', this.ConversationData.MobileNumber)
    });
    
    it('Should search by Channel', function () {
        ConversationPage.openSearch();
        ConversationPage.SearchByChannel('TND');
         cy.get('.mat-column-channelName').should('contain', 'TND')
    }
    );
    it('Should search by In Action', function () {

        ConversationPage.openSearch();
        ConversationPage.SearchByInAction(this.ConversationData.InAction);
            cy.get('.mat-column-inAction').should('contain', this.ConversationData.InAction)
    });
    it('Should search by Session Activity', function () {
            ConversationPage.openSearch();
        ConversationPage.SearchBySessionActivity(this.ConversationData.Activity);
            cy.get('.mat-column-isWithinSessionWindow').should('contain', this.ConversationData.Activity)
    }
    );
    it('Should clear search', function () {
        ConversationPage.openSearch();
        ConversationPage.ClearSearch(this.ConversationData.Name);
    }
    );
    it('Should send Client Follow Up Message', function () {
        

        ConversationPage.openSearch();
        ConversationPage.SearchByInAction('No');
        ConversationPage.ClientFollowUp(this.ConversationData.TemplateName);
        cy.contains('Message sent successfully').should('be.visible');
    }
    );
    it('Should send Client Follow Up Message and show in chat ', function () {
        

        ConversationPage.openSearch();
        ConversationPage.SearchByInAction('No');
        ConversationPage.ClientFollowUpwithShow (this.ConversationData.TemplateName)

        cy.contains('Message sent successfully').should('be.visible');
    }
    );
    it('Should start conversation', function () {

        ConversationPage.openSearch();
        ConversationPage.SearchBySessionActivity('Active');
        ConversationPage.StartConversation()

    });
    it('Should open Chat Page', function () { 
       
        ConversationPage.ChatPage()
        
        cy.url().should('include', '/chat');
        
    });
    it ('Should export the grid )', function () {
        ConversationPage.export('Conversation');
    });
      it ('Should export the chat)', function () {
         ConversationPage.ChatPage()
        ConversationPage.exportChat('chat-conversation');
    });
    
    


});
