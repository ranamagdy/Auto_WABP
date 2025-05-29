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
    it('Should add a new normal onspot Campaign successfully', function () {
      CampaignPage.AddNewCampaignInfoTab(this.CampaignData.CampaignName);
      CampaignPage.AddNewCampaignContactsTabByAdditionalNumber(this.CampaignData.Mobilenumber);
      CampaignPage.AddNewCampaignTemplateTab(this.CampaignData.TemplateName);

    });
    







});