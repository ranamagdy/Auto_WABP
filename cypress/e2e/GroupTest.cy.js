import LoginPage from '../pages/LoginPage';
import GroupPage from '../Pages/GroupPage';


describe('Add New Group' , () => {
    beforeEach (function () {
        cy.fixture ('LoginData').as('LoginData');
        cy.fixture ('GroupData').as('GroupData');
    
    cy.get('@LoginData').then((loginData) => {
LoginPage.visit();
LoginPage.login(loginData.admin.email, loginData.admin.password);

cy.url().should('include', '/pages/dashboard');
});

GroupPage.visit();

 });

 it('1️⃣ Add New Group', function () {
    cy.get('@GroupData').then((GroupData) => {
    GroupPage.clickAdd();
    GroupPage.enterGroupName(GroupData.groupName);
    GroupPage.selectGroupType(GroupData.groupType); // ✅ correct
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container').should('contain' , 'Group Created Successfully')


 });
  });

 it('2️⃣ Update Group name and availabilty', function () {
    cy.get('@GroupData').then((GroupData) => {
    GroupPage.clickEdit();
    GroupPage.enterGroupName(GroupData.updateName);
    GroupPage.updateAvailabilty ();
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container').should('contain' , 'Group Updated Successfully')

 });
  });

});


it('3️⃣ Add Contacts Manually', function () {
    cy.get('@GroupData').then((GroupData) => {
    GroupPage.clickEdit();
    GroupPage.enterGroupName(GroupData.updateName);
    GroupPage.updateAvailabilty ();
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container').should('contain' , 'Group Updated Successfully')

 });
  });


