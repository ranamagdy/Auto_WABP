import LoginPage from '../pages/LoginPage';
import CategoryLogsPage from '../Pages/CategoryLogsPage';

describe('Category Logs Page Tests', () => {
  beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');
    cy.fixture('categoryLogsData').as('data');

    // Perform login and wait for successful navigation
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      cy.url().should('not.include', '/auth/login');
    });

    // Now visit the category log page after login
    CategoryLogsPage.visit();
  });


  it('1️⃣ Should add a new category log', function () {
    CategoryLogsPage.clickAdd();
    CategoryLogsPage.fillCategoryName(this.data.newCategory.name);
    CategoryLogsPage.clickSave();
    CategoryLogsPage.getSearchResults().should('contain', this.data.newCategory.name);
  });

  it('2️⃣ Should search by name and display results', function () {
    CategoryLogsPage.openSearch();
    CategoryLogsPage.enterSearchName(this.data.searchName);
    CategoryLogsPage.clickSearch();
    CategoryLogsPage.getSearchResults().should('contain', this.data.searchName);
  });

  it('3️⃣ Should clear the search field', function () {
    CategoryLogsPage.openSearch();
    CategoryLogsPage.enterSearchName(this.data.searchName);
    CategoryLogsPage.clickClear();
    CategoryLogsPage.getSearchInput().should('have.value', '');
  });

  it('4️⃣ Should edit the first category log', function () {
    CategoryLogsPage.clickEditFirst();

    CategoryLogsPage.fillCategoryName(this.data.editedCategory.name);
    CategoryLogsPage.clickSave();
    CategoryLogsPage.getSearchResults().should('contain', this.data.editedCategory.name);
  });

  it('5️⃣ Should delete the first category log', () => {
    CategoryLogsPage.clickDeleteFirst();
    CategoryLogsPage.confirmDelete();
    cy.wait(500); // Optional: give time for delete to reflect
  });
});
