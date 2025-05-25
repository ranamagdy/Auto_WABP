import LoginPage from '../pages/LoginPage';
import PreMessagePage from '../Pages/PreMessagePage';


describe('Pre Message Page Tests', () => {
  beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');
    cy.fixture('PreMessageData').as('data');

    // Perform login and wait for successful navigation
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      cy.url().should('not.include', '/auth/login');
    });

    // Now visit the category log page after login
    PreMessagePage.visit();
  });

  it('1️⃣ Should search by Message and display results', function () {
    PreMessagePage.enterSearchMessage(this.data.searchMessage);
    PreMessagePage.clickSearch();
    PreMessagePage.getSearchResults().should('contain', this.data.searchMessage);
  });

  it('2️⃣ Should clear the search field', function () {
    PreMessagePage.enterSearchMessage(this.data.searchMessage);
    PreMessagePage.clickClear();
    PreMessagePage.getSearchInput().should('have.value', '');
  });

  it('3️⃣ Should add a new Message ', function () {
    PreMessagePage.clickAdd();
    PreMessagePage.fillnewMessage(this.data.newMessage.Message);
    PreMessagePage.clickSave();
    PreMessagePage.getSearchResults().should('contain', this.data.newMessage.Message);
  });

  it('4️⃣ Should edit the first Message', function () {
    PreMessagePage.clickEditFirst();
    PreMessagePage.fillnewMessage(this.data.editedMessage.Message);
    PreMessagePage.clickSave();
    PreMessagePage.getSearchResults().should('contain', this.data.editedMessage.name);
  });

  it('5️⃣ Should delete the first Message', () => {
    PreMessagePage.clickDeleteFirst();
    PreMessagePage.confirmDelete();
    cy.wait(500); // Optional: give time for delete to reflect
  });
});
