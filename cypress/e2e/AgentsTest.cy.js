import AgentsPage from '../Pages/AgentsPage';
import BasePage from '../Pages/BasePage';

describe('Agents Page Tests Using Fixtures', () => {
  
  // Load fixture & login, navigate to page
  BasePage.init(AgentsPage, 'AgentsData');

  it('Should open Agents page', () => {
    AgentsPage.assertPageNavigation('agents');  // dynamically asserts URL
    });

  it.only('Should add a new agent successfully', function () {
    const dynamicFullName = BasePage.generateDynamicName(this.AgentsData.FullName);
    const dynamicEmail = BasePage.generateDynamicEmail(this.AgentsData.email);
    const integrationId = Math.floor(1000 + Math.random() * 9000).toString();
    const mobileNumber = BasePage.generateEgyptMobile(this.AgentsData.mobileNumber);
    
    AgentsPage.AddNewAgent(dynamicFullName, dynamicEmail, integrationId, mobileNumber);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent created successfully');

  });

  it('Should not allow creating agent with duplicate email', function () {

  
    const fullName1 = BasePage.generateDynamicName(this.AgentsData.FullName);
    const fullName2 = BasePage.generateDynamicName(this.AgentsData.FullName);
    const mobileNumber = BasePage.generateEgyptMobile(this.AgentsData.mobileNumber);
    const duplicateEmail = BasePage.generateDynamicEmail(this.AgentsData.email);
    const integrationId1 = Math.floor(1000 + Math.random() * 9000).toString();
    const integrationId2 = Math.floor(1000 + Math.random() * 9000).toString();
    
  // Act - Create first agent (valid)
    AgentsPage.AddNewAgent(fullName1, duplicateEmail, integrationId1, mobileNumber);
  // Act - Try to create second agent with SAME email
    AgentsPage.AddNewAgent(fullName2, duplicateEmail, integrationId2, mobileNumber);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Email exists');
});

it('Should not allow creating agent with duplicate mobile number', function () {

  
    const fullName1 = BasePage.generateDynamicName(this.AgentsData.FullName);
    const fullName2 = BasePage.generateDynamicName(this.AgentsData.FullName);
    const mobileNumber = BasePage.generateEgyptMobile(this.AgentsData.mobileNumber);
    const email1 = BasePage.generateDynamicEmail(this.AgentsData.email);
    const email2 = BasePage.generateDynamicEmail(this.AgentsData.email);
    const integrationId1 = Math.floor(1000 + Math.random() * 9000).toString();
    const integrationId2 = Math.floor(1000 + Math.random() * 9000).toString();
    
  // Act - Create first agent (valid)
    AgentsPage.AddNewAgent(fullName1, email1, integrationId1, mobileNumber);
  // Act - Try to create second agent with SAME email
    AgentsPage.AddNewAgent(fullName2, email2, integrationId2, mobileNumber);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Mobile number exists');
});

  it('Should show validation messages when clicking Save without filling mandatory fields', () => {
    AgentsPage.clickAddNew();
    AgentsPage.checkonReceivingchats();
    AgentsPage.clickSave();

    const validationMessages = [
      'Please Enter Name',
      'Please Enter Email',
      'Please Select Role',
      'Please Enter Integration Id',
      'Please Select Team',
      'Minimum Value 1'

    ];

    validationMessages.forEach(message => {
      cy.contains(message).should('be.visible');
    });

  });


  it('Search by Name', function () {

    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.FullName);
    
    cy.get('.mat-row > .cdk-column-adminName')
      .should('contain', this.AgentsData.FullName);

  });

  it('Search by Email', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByEmail(this.AgentsData.email);
    
    cy.get('.mat-row > .cdk-column-email')
      .should('contain', this.AgentsData.email);


  });

  it('Should search by mobile number successfully', function () {
    const dynamicFullName = BasePage.generateDynamicName(this.AgentsData.FullName);
    const dynamicEmail = BasePage.generateDynamicEmail(this.AgentsData.email);
    const integrationId = Math.floor(1000 + Math.random() * 9000).toString();
    const mobileNumber = BasePage.generateEgyptMobile(this.AgentsData.mobileNumber);
    
    AgentsPage.AddNewAgent(dynamicFullName, dynamicEmail, integrationId, mobileNumber);
    AgentsPage.openSearch()
    AgentsPage.SearchByMobile(mobileNumber)
    cy.get('td.mat-column-mobileNumber')
      .should('contain', mobileNumber);

  });




  it('Clear', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.FullName);
    AgentsPage.SearchByEmail(this.AgentsData.email);
    AgentsPage.clickClear();
    
    cy.get('input[data-placeholder="Name"]')
      .should('have.value', '');
    
      cy.get('input[data-placeholder="Email"]')
      .should('have.value', '');

  });


  it('Edit name and email and mobile number', function () {
    const dynamicEditName = BasePage.generateDynamicName(this.AgentsData.editname);
    const dynamicEditEmail = BasePage.generateDynamicEmail(this.AgentsData.editemail);
    const mobileNumber = BasePage.generateEgyptMobile(this.AgentsData.mobileNumber);
    AgentsPage.EditAgent(dynamicEditName, dynamicEditEmail, mobileNumber);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent updated successfully');

  });



  it('should Be the user not active ', function () {

    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.editname);
    cy.wait(1000);
    AgentsPage.changetoNotactive();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent deactivated successfully')
  })

  it('should Be the user active ', function () {

    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.editname);
    cy.wait(1000);
    AgentsPage.changetoActive();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent activated successfully')
  })

  it('Delete The agent', function () {
    AgentsPage.deleteFirstRow();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Agent deleted successfully')
  })

  it('should export the Excel file', () => {
    // Click the Export to Excel button
    AgentsPage.export('Agents');
  })

  it('Should not allow creating agent with invalid email formats', function () {
     
     const invalidEmails = [
       'testgmail.com',
       'test@',
       '@gmail.com',
       'test@@gmail.com',
       'test@gmail',
       'test#gmail.com'
     ];
   
     AgentsPage.testInvalidEmails(invalidEmails);
   
});




});
