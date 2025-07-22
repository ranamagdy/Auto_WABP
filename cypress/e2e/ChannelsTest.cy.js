import ChannelsPage from '../Pages/ChannelsPage';
import LoginPage from '../pages/LoginPage';
describe('Channel Page Tests Using Fixtures', () => {
    beforeEach(function () {

        LoginPage.visit();
        cy.fixture('LoginData').then((data) => {
            this.LoginData = data; // ✅ Assign fixture data to "this"
        }).then(() => {
            LoginPage.visit();
            LoginPage.login(this.LoginData.admin.email, this.LoginData.admin.password);
        });

        ChannelsPage.visitChannelPage();
        cy.url().should('include', '/pages/channels'); // ✅ expected path
        cy.fixture('ChannelData').then((data) => {
            cy.wrap(data).as('ChannelData'); // 🔹 Store fixture data globally
        })


    });


/*
    it('Template is synced Suceessfully', function () {
        ChannelsPage.ChannelSync();

    });
*/

    it('Change not active channel', function () {

        ChannelsPage.changetoNotactive();

        cy.get('.mat-snack-bar-container').should('contain', 'Channel deactivated successfully');

    });

    it('Change to active channel', function () {
        ChannelsPage.changetoActive();
        //cy.get('.mat-snack-bar-container').should('be.visible');
        // cy.wait(2000);
        cy.get('.mat-snack-bar-container').should('contain', 'Channel activated successfully');


    })
      
    it('Change Call Center Availabilty ', function () {

        ChannelsPage.CallCenterAvailability();

        cy.get('.mat-snack-bar-container').should('contain', 'Call center availability updated successfully.');


    })

    it('Set Custome Call Center', function () {

        ChannelsPage.AddCustomCallCenter(this.ChannelData.EnglishMessage, this.ChannelData.ArabicMessage)
        cy.get('.mat-simple-snack-bar-content').should('contain','Call center availability updated successfully.')




    })
 

        it('Remove a custome Holiday', function () {

        ChannelsPage.RemoveCustomCallCenter()
        cy.get('.mat-simple-snack-bar-content').should('contain','Call center availability updated successfully.')




    })





});