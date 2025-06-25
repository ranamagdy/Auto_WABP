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
    GroupPage.clickAdd();
    GroupPage.enterGroupName(this.data.groupName);
    GroupPage.selectGroupType(this.GroupData.groupType); // ✅ correct
    GroupPage.clickSave();
    GroupPage.searchGroupByName(this.GroupData.groupName);
    GroupPage.groupnameResult().should('contain', GroupData.groupName.NewGroup);

 });
  });
