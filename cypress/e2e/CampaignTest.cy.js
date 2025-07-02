import LoginPage from '../pages/LoginPage';
import CampaignPage from '../Pages/CampaignPage';

describe('Agents Page Tests Using Fixtures', () => {

beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');
    

    // Perform login and wait for successful navigation
      cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      cy.url().should('not.include', '/auth/login');
    });


    CampaignPage.visitCampaign();
    
    cy.fixture('CampaignData').then((data) => {
    cy.wrap(data).as('CampaignData'); // 🔹 Store fixture data globally
});
  });

it('Should create Onspot campaigns Successfully', function () {
    const campaignsToCreate = 60; // or whatever number you want

    for (let i = 56; i <= campaignsToCreate; i++) {
      const campaignBase = this.CampaignData.campaigns[0];
      const randomSuffix = Math.floor(100 + Math.random() * 900); // Random last 3 digits
      const dynamicMobileNumber = `${campaignBase.BaseMobileNumber}${randomSuffix}`;
      const dynamicCampaignName = `${campaignBase.CampaignName} ${i}`;

      // Randomly pick a template from the fixture
      const templateNames = this.CampaignData.templateNames;
      const randomTemplate = templateNames[Math.floor(Math.random() * templateNames.length)];

      cy.log(`Creating campaign: ${dynamicCampaignName} with mobile: ${dynamicMobileNumber} and template: ${randomTemplate}`);

      CampaignPage.AddNewCampaignInfoTab(dynamicCampaignName);
      CampaignPage.AddNewCampaignContactsTab(dynamicMobileNumber);
      CampaignPage.AddNewCampaignTemplateTab(randomTemplate);
    }
  });
   /*

  it('Should create Scheduled campaigns Successfully', function () {
    const campaignsToCreate = 3; // or whatever number you want

    for (let i = 3; i <= campaignsToCreate; i++) {
      const campaignBase = this.CampaignData.campaigns[0];
      const randomSuffix = Math.floor(100 + Math.random() * 900); // Random last 3 digits
      const dynamicMobileNumber = `${campaignBase.BaseMobileNumber}${randomSuffix}`;
      const dynamicCampaignName = `${campaignBase.CampaignScheduleName} ${i}`;

      // Randomly pick a template from the fixture
      const templateNames = this.CampaignData.templateNames;
      const randomTemplate = templateNames[Math.floor(Math.random() * templateNames.length)];

      cy.log(`Creating campaign: ${dynamicCampaignName} with mobile: ${dynamicMobileNumber} and template: ${randomTemplate}`);
      
      CampaignPage.AdScheduleCampaignInfoTab(dynamicCampaignName);
      CampaignPage.AddNewCampaignContactsTab(dynamicMobileNumber);
      CampaignPage.AddNewCampaignTemplateTab(randomTemplate);
      cy.wait(3000); // Waits for 3 seconds

    }

  });
 
    it('Should Search by the Campaign Title Successfully', function () {
      CampaignPage.openSearch()

      CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
      cy.get('.example-element-row > .cdk-column-title').should('contain',this.CampaignData.campaigns[0].CampaignName)

  });
      it('Should Search by Sending Status Successfully', function () {
      CampaignPage.openSearch()

      CampaignPage.SearchBySendingStatus();
      cy.get('.example-element-row > .cdk-column-sendingStatus').should('contain','Sent')

  });
*/

});




