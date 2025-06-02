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

it('Should create campaigns with dynamic template names from fixture', function () {
    const campaignsToCreate = 95; // or whatever number you want

    for (let i = 90; i <= campaignsToCreate; i++) {
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

});




