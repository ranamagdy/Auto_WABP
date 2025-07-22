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

    const campaignsNeeded = 1;

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
      cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

    }

  });

  it('Should create Onspot campaigns with custom group Successfully', function () {

    const campaignsNeeded = 1;

    // to ensure the number is not repeated
    const usedSuffixes = new Set();


    while (usedSuffixes.size < campaignsNeeded) {
      // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);

      const campaignBase = this.CampaignData.campaigns[0];
      const dynamicCampaignName = `${campaignBase.CampaignName} ${randomSuffix}`;


      CampaignPage.customGroupCamp(dynamicCampaignName, this.CampaignData.templateNames[1])

      cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')
    }

  });

  it('Should create Scheduled campaigns Successfully', function () {
    const campaignsNeeded = 1;

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

      CampaignPage.ScheduleCampaignInfoTab(dynamicCampaignName);
      CampaignPage.ContactsTab(dynamicMobileNumber);
      CampaignPage.TemplateTab(randomTemplate);
      cy.wait(3000); // Waits for 3 seconds
      cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

    }

  });

  it('Should Search by the Campaign Title Successfully', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
    cy.get('.example-element-row > .cdk-column-title').should('contain', this.CampaignData.campaigns[0].CampaignName)

  });

  it('Should Search by Onspot Sending Type Successfully', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByOnspotCmapaign();

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Onspot')


  });

  it('Should Search by Scheduled Sending Type Successfully', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByScheduledCmapaign()

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Scheduled')


  });

  it('Should Search by Sending Status Successfully', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchBySendingStatus();
    cy.get('.example-element-row > .cdk-column-sendingStatus').should('contain', 'Sent')

  });

  it('Should Duplicate The Campaign without any changing ', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot);
    CampaignPage.DuplicateWithoutChanging();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });

  it('Should Duplicate the campaign with changing from Custom to Normal ', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByCampaignName(this.CampaignData.CustomOnspot)

    CampaignPage.CustomToNormal(this.CampaignData.MobileNumber)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


  it('Should Duplicate the campaign with changing from Normal to Custom ', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot)

    CampaignPage.NormalToCutom()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


  it('Should Duplicate the campaign with changing from onspot to schedual', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot)

    CampaignPage.OnspotToScheduled();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });

  it('Should Duplicate the campaign with changing from schedual to onspot ', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByCampaignName(this.CampaignData.NormalSchedual)

    CampaignPage.ScheduledToOnspot()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


  it('Should Duplicate the campaign with changing The template ', function () {
    CampaignPage.openSearch()

    CampaignPage.SearchByCampaignName(this.CampaignData.randomcamp)

    CampaignPage.DuplicateChangeTemp(this.CampaignData.tempName)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


});




