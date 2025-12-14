import LoginPage from '../Pages/LoginPage';
import PreMessagePage from '../Pages/PreMessagePage';
import BasePage from '../Pages/BasePage';



describe('Pre Message Page Tests', () => {

  BasePage.init(PreMessagePage, 'PreMessageData');

  it('Should add a new Message ', function () {
    PreMessagePage.clickAddNew();
    PreMessagePage.fillnewMessage(this.PreMessageData.newMessage.Message);
    PreMessagePage.clickSave();
    cy.get('table.mat-table tr')
      .should('contain', this.PreMessageData.newMessage.Message);
  });

  it('Should edit the first Message', function () {
    PreMessagePage.clickEditFirst();
    PreMessagePage.fillnewMessage(this.PreMessageData.editedMessage.Message);
    PreMessagePage.clickSave();
    cy.get('table.mat-table tr').should('contain', this.PreMessageData.editedMessage.Message);
  });

  it('Should search by Message and display results', function () {
    PreMessagePage.openSearch();
    PreMessagePage.enterSearchMessage(this.PreMessageData.editedMessage.Message);
    PreMessagePage.clickSearch();
    cy.get('table.mat-table tr').should('contain.text', this.PreMessageData.editedMessage.Message);

  });

  it('Should clear the search field', function () {
    PreMessagePage.openSearch();
    PreMessagePage.enterSearchMessage(this.PreMessageData.searchMessage);
    PreMessagePage.clickClear();
    cy.get('table.mat-table tr').should('have.value', '');
  });

  
  it('Should delete the first Message', () => {
    PreMessagePage.deleteFirstRow();
    cy.wait(500); // Optional: give time for delete to reflect
  });
  
});
