import CampaignPage from '../Pages/CampaignPage';
import BasePage from '../Pages/BasePage';


describe('Campaign Page Tests Using Fixtures', () => {

  BasePage.init(CampaignPage, 'CampaignData');
  

  it('Should create Onspot with Normal group Successfully', function () {


    const data = BasePage.generateCampaignData(this.CampaignData);
    const SendingPreferences = this.CampaignData.SendingPreferences[0];
    const GroupType = this.CampaignData.GroupType[0];

    CampaignPage.AddNewCampaignInfoTab(
      data.campaignName, 
      this.CampaignData.ChannelName,
      SendingPreferences,
      GroupType
    );


    CampaignPage.ContactsTab(data.mobileNumber);
    CampaignPage.TemplateTab(data.template);
    
    cy.wait(3000); 
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully')

  });

  it.only('Should create Onspot with Normal group using 100 mobile numbers Successfully', function () {

  const data = BasePage.generateCampaignData(this.CampaignData);
  const sendingPreferences = this.CampaignData.SendingPreferences[0];
  const groupType = this.CampaignData.GroupType[0];
  const mobileNumbers = Array.from({ length: 200 }, (_, i) =>`01012345${(100 + i).toString().padStart(3, '0')}`);
  
  
  CampaignPage.AddNewCampaignInfoTab(
    data.campaignName,
    this.CampaignData.ChannelName,
    sendingPreferences,
    groupType
  );

  CampaignPage.addMultipleContacts(mobileNumbers);
  CampaignPage.TemplateTab(data.template);

  cy.get('.mat-simple-snack-bar-content', { timeout: 10000 })
    .should('contain', 'Campaign Created Successfully');
});


  it('Should Duplicate The Campaign without any changing ', function () {
    
    CampaignPage.DuplicateWithoutChanging();
    cy.wait(500)
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully')

  });

  it('Should Duplicate the campaign with changing from Normal to Custom ', function () {
    
    CampaignPage.NormalToCutom()
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully')


  });


  it('Should create Onspot campaigns with custom group Successfully', function () {
    const SendingPreferences = this.CampaignData.SendingPreferences[0];
    const GroupType = this.CampaignData.GroupType[1];

    const data = BasePage.generateCampaignData(this.CampaignData);
    CampaignPage.customGroupCamp(
      data.campaignName, 
      data.template, 
      this.CampaignData.ChannelName,
      SendingPreferences,
      GroupType)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });

  it('Should Duplicate the campaign with changing from Custom to Normal ', function () {
    CampaignPage.CustomToNormal(this.CampaignData.MobileNumber)
    cy.wait(2000)
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully')


  });

  it('Should Duplicate the campaign with changing from onspot to schedual', function () {
    CampaignPage.OnspotToScheduled();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully')


  });


it('Should create Scheduled campaigns Successfully', function () {
    const data = BasePage.generateCampaignData(this.CampaignData);

    CampaignPage.ScheduleCampaignInfoTab(
      data.campaignName, 
      this.CampaignData.ChannelName
    );

    CampaignPage.ContactsTab(data.mobileNumber);
    CampaignPage.TemplateTab(data.template);
    cy.wait(3000); 
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully')



  });

  it('Should Duplicate the campaign with changing from schedual to onspot ', function () {
    CampaignPage.ScheduledToOnspot()
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully')


  });


  it('Should Search by the Campaign Title Successfully', function () {
    CampaignPage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
    cy.get('.example-element-row > .cdk-column-title')
      .should('contain', this.CampaignData.campaigns[0].CampaignName)

  });

  it('Should Search by Onspot Sending Type Successfully', function () {
    CampaignPage.openSearch();
    CampaignPage.SearchByOnspotCmapaign();
    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status')
      .should('contain', 'Onspot')

  });

  it('Should Search by Scheduled Sending Type Successfully', function () {
    CampaignPage.openSearch();
    CampaignPage.SearchByScheduledCmapaign()
    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status')
      .should('contain', 'Scheduled')
  });

  it('Should Search by Sending Status Successfully', function () {
    CampaignPage.openSearch();
    CampaignPage.SearchBySendingStatus();
    cy.wait(2000);
    cy.get('.example-element-row > .cdk-column-sendingStatus')
      .should('contain', 'Sent')

  });


  it('Should Clear Successfully', function () {
    CampaignPage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
    CampaignPage.clickClear();
    cy.get('input[data-placeholder="Campaign Title"]')
    .should('have.value', '');

  });

  

  it('Should Duplicate the campaign with changing The template ', function () {
    CampaignPage.DuplicateChangeTemp(this.CampaignData.templateNames[0]);
    cy.wait(3000);
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully')


  });
  it('Should View Campaign  Successfully', function () {

    CampaignPage.ViewCampaign();
    cy.url().should('include', '/campaigns/report');
  });
  it('Should Details Campaign  Successfully', function () {

    CampaignPage.DetailsCampaign();
    cy.url().should('include', '/campaigns/view');

  });
  it('Should cancel Scheduled  Campaign  Successfully', function () {
    CampaignPage.openSearch();
    CampaignPage.CancelSchadualedCampaign();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Cancelled Successfully');
  });
});




