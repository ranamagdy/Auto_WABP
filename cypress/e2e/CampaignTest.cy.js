import LoginPage from '../pages/LoginPage';
import CampaignPage from '../Pages/CampaignPage';

describe('Campaign Page Tests Using Fixtures', () => {

  beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');


    // Perform login and wait for successful navigation
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      // cy.url().should('not.include', '/auth/login');
    });


    CampaignPage.visitCampaign();

    cy.fixture('CampaignData').then((data) => {
      cy.wrap(data).as('CampaignData'); // 🔹 Store fixture data globally
    });
  });

  it('Should create Onspot campaigns Successfully', function () {

    const campaignsNeeded = 5;

    // to ensure the number is not repeated
    const usedSuffixes = new Set();


    while (usedSuffixes.size < campaignsNeeded) {
      // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);

      const campaignBase = this.CampaignData.campaigns[0];
      const dynamicMobileNumber = `${campaignBase.BaseMobileNumber}${randomSuffix}`;
      const dynamicCampaignName = `${campaignBase.CampaignName} ${randomSuffix}`;

      // choose the template randomly 
      const randomTemplate = Cypress._.sample(this.CampaignData.templateNames);

      CampaignPage.AddNewCampaignInfoTab(dynamicCampaignName);
      CampaignPage.ContactsTab(dynamicMobileNumber);
      CampaignPage.TemplateTab(randomTemplate);
      cy.wait(3000); // Waits for 3 seconds

    }

  });


  it('Should create Scheduled campaigns Successfully', function () {
    const campaignsNeeded = 5;

    // to ensure the number is not repeated
    const usedSuffixes = new Set();


    while (usedSuffixes.size < campaignsNeeded) {
      // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);
      const campaignBase = this.CampaignData.campaigns[0];
      const dynamicMobileNumber = `${campaignBase.BaseMobileNumber}${randomSuffix}`;
      const dynamicCampaignName = `${campaignBase.CampaignName} ${randomSuffix}`;

      // choose the template randomly 
      const randomTemplate = Cypress._.sample(this.CampaignData.templateNames);

      CampaignPage.AdScheduleCampaignInfoTab(dynamicCampaignName);
      CampaignPage.AddNewCampaignContactsTab(dynamicMobileNumber);
      CampaignPage.AddNewCampaignTemplateTab(randomTemplate);
      cy.wait(3000); // Waits for 3 seconds

    }

  });

  it('Should Search by the Campaign Title Successfully', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
    cy.get('.example-element-row > .cdk-column-title').should('contain', this.CampaignData.campaigns[0].CampaignName)

  });
  it('Should Search by Sending Status Successfully', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchBySendingStatus();
    cy.get('.example-element-row > .cdk-column-sendingStatus').should('contain', 'Sent')

  });

   it('Should duplicate Onspot Campaign', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
    CampaignPage.DuplicateWithoutChanging();

  });

});




