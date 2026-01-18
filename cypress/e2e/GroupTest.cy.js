import GroupPage from '../Pages/GroupPage';
import BasePage from '../Pages/BasePage';


describe('Add New Group', () => {

  BasePage.init(GroupPage, 'GroupData');

  it('Should open Group page', () => {
       GroupPage.assertPageNavigation('groups');  // dynamically asserts URL
    });

  it('Add Normal Group', function () {
    GroupPage.clickAddNew();

    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.groupName);

    GroupPage.enterGroupName(dynamiGroupBasenName);
    GroupPage.selectGroupType(this.GroupData.groupType);
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container')
      .should('contain', 'Group Created Successfully');


  });

  it('Should not allow creating Group with duplicate name', function () {

    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.groupName);
    GroupPage.clickAddNew();
    GroupPage.enterGroupName(dynamiGroupBasenName);
    GroupPage.selectGroupType(this.GroupData.groupType);
    GroupPage.clickSave();
    GroupPage.clickAddNew();
    GroupPage.enterGroupName(dynamiGroupBasenName);
    GroupPage.selectGroupType(this.GroupData.groupType);
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container')
      .should('contain', 'group already exists');


  });

  it('Should show validation messages when clicking Save without filling mandatory fields', () => {
          GroupPage.clickAddNew();
          GroupPage.clickSave();
      
          const validationMessages = [
            'Please Enter Group Name',
            'Please Select Group Type'
          ];
      
          validationMessages.forEach(message => {
            cy.contains(message).should('be.visible');
          });
      
        }); 

  it('Should show validation messages when clicking Save without Add Mobile Number', () => {
          GroupPage.clickEdit();
          GroupPage.addContactsManually();
          GroupPage.saveManualContacts();
      
          const validationMessages = [
            'Please Enter Mobile Number',
          ];
      
          validationMessages.forEach(message => {
            cy.contains(message).should('be.visible');
          });
      
        }); 


  it('Update Group name and availability', function () {


    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.updateName);

    GroupPage.clickEdit()
    GroupPage.enterGroupName(dynamiGroupBasenName);
    GroupPage.updateGroupAvailability();
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container')
      .should('contain', 'Group Updated Successfully');


  });


  it('Search In Group Page By Name', function () {

    GroupPage.openSearch();
    GroupPage.enterGroupName(this.GroupData.updateName);
    GroupPage.clickSearch();
    GroupPage.getSearchResults()
             .should('contain', this.GroupData.updateName);


  });


  it('Clear Search fields', function () {

    GroupPage.openSearch();
    GroupPage.enterGroupName(this.GroupData.updateName);
    GroupPage.clickClear();
    cy.get('input[data-placeholder="Group Name"]')
      .should('have.value', '');


  });

  it('Search In Group Page By Group Type', function () {

    GroupPage.openSearch();
    GroupPage.selectGroupTypeInSearch(this.GroupData.groupType);
    GroupPage.clickSearch();
    GroupPage.getSearchResults()
             .should('contain', this.GroupData.groupType);


  });

  it('Search In Group Page By Group Availability', function () {

    GroupPage.openSearch();
    GroupPage.selectGroupAvailability('No');
    GroupPage.clickSearch();
    GroupPage.getSearchResults()
             .should('contain', this.GroupData.updateAvailability);

  });

  it('Add Contacts Manually', function () {

    GroupPage.clickEdit();
    GroupPage.addContactsManually();
    GroupPage.enterMobileNumber(this.GroupData.mobileNumber);
    GroupPage.saveManualContacts();
    cy.get('.cdk-overlay-container', { timeout: 10000 })
      .should('contain', 'Group Contact Created Successfully');
  });


  it('Search in Group Contacts List', function () {

    GroupPage.clickEdit();
    GroupPage.searchByMobileNumber(this.GroupData.mobileNumber);
    GroupPage.clickSearch();
    GroupPage.getSearchResults()
             .should('contain', this.GroupData.mobileNumber);
  });


  it('clear from Group Contacts List', function () {

    GroupPage.clickEdit();
    GroupPage.searchByMobileNumber(this.GroupData.mobileNumber);
    GroupPage.clickClear();
    GroupPage.getSearchResults()
             .should('have.value', '');
  });


  it('Delete from Group Contacts List', function () {

    GroupPage.clickEdit();
    GroupPage.deleteFirstRow();
    cy.get('.cdk-overlay-container', { timeout: 10000 })
      .should('contain', 'Group Contact Deleted Successfully');
  });


  it('Upload File in Normal Group', function () {

    GroupPage.openFileTab();
    GroupPage.clickAddNew();
    GroupPage.uploadNormalFile();
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container', { timeout: 20000 })
      .should('contain', 'File uploaded successfully');
  });


  it('should export the Excel file', () => {
    GroupPage.export('Groups');
  });


  it('Search in file page', function () {

    GroupPage.openFileTab();
    GroupPage.enterFileName(this.GroupData.fileName);
    GroupPage.clickSearch();
    GroupPage.getSearchResults()
             .should('contain', this.GroupData.fileName);
  });

  it('Clear From file page', function () {

    GroupPage.openFileTab();
    GroupPage.enterFileName(this.GroupData.fileName);
    GroupPage.clickClear();
    GroupPage.getSearchResults()
             .should('have.value', '');
  });


  it('Export Group Contacts', () => {
    GroupPage.export('Groups');
  });



  it('Delete Normal Group', function () {
    GroupPage.deleteFirstRow();
    cy.get('.cdk-overlay-container', { timeout: 10000 })
      .should('contain', 'Group Deleted Successfully');


  });

  it('Add Custom Group', function () {

    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.customGroupname);

    GroupPage.clickAddNew();
    GroupPage.enterGroupName(dynamiGroupBasenName);
    GroupPage.selectGroupType(this.GroupData.customGrouptype);
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container')
      .should('contain', 'Group Created Successfully');
  });


  it('Update Custom Group name and availability', function () {

    
    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.updateCustomname);

    GroupPage.clickEdit();
    GroupPage.enterGroupName(dynamiGroupBasenName);
    GroupPage.updateGroupAvailability();
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container')
      .should('contain', 'Group Updated Successfully');
  });


  it('Search In Group Page By Custom Group Typy', function () {

    GroupPage.openSearch();
    GroupPage.selectGroupTypeInSearch(this.GroupData.customGrouptype);
    GroupPage.clickSearch();
    GroupPage.getSearchResults()
             .should('contain', this.GroupData.customGrouptype);
  });


  it('Search In Group Page By Custom Group Name', function () {

    GroupPage.openSearch();
    GroupPage.enterGroupName('Update Custom Group');
    GroupPage.clickSearch();
    GroupPage.getSearchResults()
             .should('contain', this.GroupData.updateCustomname);
  });


  it('Upload File in Custom Group', function () {

    GroupPage.openFileTab();
    GroupPage.clickAddNew();
    GroupPage.uploadCustomFile();
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container', { timeout: 20000 })
      .should('contain', 'File uploaded successfully');
  });


  it('Export the Excel file for custom group', () => {
    // Click the Export to Excel button
    GroupPage.clickEdit();
    GroupPage.export('Groups');
  });


  it('Delete from Custom Group Contacts List', function () {

    GroupPage.clickEdit();
    GroupPage.deleteFirstRow();
    cy.get('.cdk-overlay-container', { timeout: 10000 })
      .should('contain', 'Group Contact Deleted Successfully');
  });


  it('Delete Custom Group', function () {

    GroupPage.deleteFirstRow();
    cy.get('.cdk-overlay-container', { timeout: 10000 })
      .should('contain', 'Group Deleted Successfully');
  });


});


