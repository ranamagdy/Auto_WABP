import CategoryLogsPage from '../Pages/CategoryLogsPage';
import BasePage from '../Pages/BasePage';


describe('Category Logs Page Tests', () => {

  BasePage.init(CategoryLogsPage, 'categoryLogsData');


  it('Should open Category Logs page', () => {
   CategoryLogsPage.assertPageNavigation('categoryLogs');  // dynamically asserts URL
  });

  it('Should add a new category log', function () {

    const dynamiCategoryLog = BasePage.generateDynamicName(this.categoryLogsData.newCategory.name);

    CategoryLogsPage.clickAddNew();
    CategoryLogsPage.fillCategoryName(dynamiCategoryLog);
    CategoryLogsPage.clickSave();
    CategoryLogsPage.getSearchResults().should('contain', this.categoryLogsData.newCategory.name);

  });

  it('Should search by name and display results', function () {
    CategoryLogsPage.openSearch();
    CategoryLogsPage.enterSearchName(this.categoryLogsData.searchName);
    CategoryLogsPage.clickSearch();
    CategoryLogsPage.getSearchResults().should('contain', this.categoryLogsData.searchName);
  });

  it('Should clear the search field', function () {
    CategoryLogsPage.openSearch();
    CategoryLogsPage.enterSearchName(this.categoryLogsData.searchName);
    CategoryLogsPage.clickClear();
    CategoryLogsPage.getSearchInput().should('have.value', '');
  });

  it('Should edit the first category log', function () {
    const data = BasePage.generateDynamicName(this.categoryLogsData.editedCategory.name);
    CategoryLogsPage.clickEditFirst();
    CategoryLogsPage.fillCategoryName(data);
    CategoryLogsPage.clickSave();
    CategoryLogsPage.getSearchResults().should('contain', data);
  });

  it('Should delete the first category log', () => {
    CategoryLogsPage.deleteFirstRow();
    cy.wait(500); // Optional: give time for delete to reflect
  });
});
