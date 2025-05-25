 import ChannelsPage from '../Pages/ChannelsPage';
 import LoginPage from '../pages/LoginPage';
 describe('Agents Page Tests Using Fixtures', () => {
     beforeEach(function () {

         LoginPage.visit();
         cy.fixture('LoginData').then((data) => {
             this.LoginData = data; // ✅ Assign fixture data to "this"
         }).then(() => {
             LoginPage.visit();
             LoginPage.login(this.LoginData.admin.email, this.LoginData.admin.password);
         });

     });

    /*

    it ('Template is synced Suceessfully',function() {
    ChannelsPage.ChannelSync();

    });
    */

     it('Change not active channel', function () {
         
        ChannelsPage.changetoNotactive();

       cy.get('.mat-snack-bar-container').should('contain','Channel deactivated successfully');

    });
    /*
    it ('Change to active channel',function(){
      ChannelsPage.changetoActive();
      //cy.get('.mat-snack-bar-container').should('be.visible');
     // cy.wait(2000);
     cy.get('.mat-snack-bar-container').should('contain','Channel activated successfully');
    

  })
    */    
    
 });