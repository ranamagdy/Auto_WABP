import TermsRolesPage from "../Pages/Terms&RolesPage";
import BasePage from '../Pages/BasePage';


describe('Terms&Roles Tests Using Fixtures', () => {
  BasePage.init(TermsRolesPage, 'TermsRolesData');

  
  it('Should open Terms&Roles page', () => {
         TermsRolesPage.assertPageNavigation('roles');  // dynamically asserts URL
      });

  it('Should add a new Role successfully', function () {

    const dynamicRoleName = BasePage.generateDynamicName(this.TermsRolesData.AddRoleName);

    TermsRolesPage.AddNewRole(dynamicRoleName);
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Role created successfully');
  });

  it('Should show validation messages when clicking Save without filling mandatory fields', () => {
        TermsRolesPage.clickAddNew();
        TermsRolesPage.clickSave();
    
        const validationMessages = ['Please Enter Name','You must select at least one permission on one module'];
    
        validationMessages.forEach(message => {
          cy.contains(message).should('be.visible');
        });
    
      });
  


  it('Should Search by Name Role successfully', function () {
    TermsRolesPage.openSearch();
    TermsRolesPage.SearchByName(this.TermsRolesData.AddRoleName);
    cy.get('.mat-row > .cdk-column-enName').should('contain', this.TermsRolesData.AddRoleName);
  });


  it('Should Edit the Role successfully', function () {

    const dynamicEditRoleName = BasePage.generateDynamicName(this.TermsRolesData.EditRoleName);
    TermsRolesPage.EditRole(dynamicEditRoleName);
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Role updated successfully');
  });


  it('Should clear the search successfully', function () {
    TermsRolesPage.openSearch();
    TermsRolesPage.SearchByName(this.TermsRolesData.EditRoleName);
    TermsRolesPage.clickClear();
    cy.get('input[formcontrolname="roleName"]').should('have.value', '');


  });

  it('Should Delete the Role successfully', function () {
    TermsRolesPage.deleteFirstRow();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Role deleted successfully');


  });


});
