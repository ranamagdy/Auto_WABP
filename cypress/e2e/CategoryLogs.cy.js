import CategoryLogsPage from '../Pages/CategoryLogsPage';
import BasePage from '../Pages/BasePage';


describe('Category Logs Page Tests', () => {

  BasePage.init(CategoryLogsPage, 'categoryLogsData');

  it('1️⃣ Should add a new category log', function () {

    const dynamiCategoryLog = BasePage.generateDynamicName(this.categoryLogsData.newCategory.name);

    CategoryLogsPage.clickAdd();
    CategoryLogsPage.fillCategoryName(dynamiCategoryLog);
    CategoryLogsPage.clickSave();
    CategoryLogsPage.getSearchResults().should('contain', this.categoryLogsData.newCategory.name);

  });

  it('2️⃣ Should search by name and display results', function () {
    BasePage.openSearch();
    CategoryLogsPage.enterSearchName(this.categoryLogsData.searchName);
    CategoryLogsPage.clickSearch();
    CategoryLogsPage.getSearchResults().should('contain', this.categoryLogsData.searchName);
  });

  it('3️⃣ Should clear the search field', function () {
    BasePage.openSearch();
    CategoryLogsPage.enterSearchName(this.categoryLogsData.searchName);
    BasePage.clickClear();
    CategoryLogsPage.getSearchInput().should('have.value', '');
  });

  it('4️⃣ Should edit the first category log', function () {
    const data = BasePage.generateDynamicName(this.categoryLogsData.editedCategory.name);
    CategoryLogsPage.clickEditFirst();
    CategoryLogsPage.fillCategoryName(data);
    CategoryLogsPage.clickSave();
    CategoryLogsPage.getSearchResults().should('contain', data);
  });

  it('5️⃣ Should delete the first category log', () => {
    BasePage.Delete();
    cy.wait(500); // Optional: give time for delete to reflect
  });
});
