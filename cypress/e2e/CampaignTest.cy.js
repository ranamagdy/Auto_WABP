import CampaignPage from '../Pages/CampaignPage';
import BasePage from '../Pages/BasePage';


describe('Campaign Page Tests Using Fixtures', () => {

  BasePage.init(CampaignPage, 'CampaignData');

  it('Should create Onspot with Normal group Successfully', function () {


    const data = BasePage.generateCampaignData(this.CampaignData);
    const SendingPreferences = this.CampaignData.SendingPreferences[0];
    const GroupType = this.CampaignData.GroupType[0];

    CampaignPage.AddNewCampaignInfoTab(data.dynamicCampaignName, this.CampaignData.ChannelName,SendingPreferences,GroupType);
    CampaignPage.ContactsTab(data.dynamicMobileNumber);
    CampaignPage.TemplateTab(data.randomTemplate);
    cy.wait(3000); // Waits for 3 seconds
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });

  it('Should create Onspot campaigns with custom group Successfully', function () {
    const SendingPreferences = this.CampaignData.SendingPreferences[0];
    const GroupType = this.CampaignData.GroupType[1];

    const data = BasePage.generateCampaignData(this.CampaignData);
    CampaignPage.customGroupCamp(data.dynamicCampaignName, data.randomTemplate, this.CampaignData.ChannelName,SendingPreferences,GroupType)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });

it('Should create Scheduled campaigns Successfully', function () {
    const data = BasePage.generateCampaignData(this.CampaignData);

    CampaignPage.ScheduleCampaignInfoTab(data.dynamicCampaignName, this.CampaignData.ChannelName);
    CampaignPage.ContactsTab(data.dynamicMobileNumber);
    CampaignPage.TemplateTab(data.randomTemplate);
    cy.wait(3000); // Waits for 3 seconds
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')



  });

  it('Should Search by the Campaign Title Successfully', function () {
    BasePage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
    cy.get('.example-element-row > .cdk-column-title').should('contain', this.CampaignData.campaigns[0].CampaignName)

  });

  it('Should Search by Onspot Sending Type Successfully', function () {
    BasePage.openSearch();
    CampaignPage.SearchByOnspotCmapaign();
    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Onspot')

  });

  it('Should Search by Scheduled Sending Type Successfully', function () {
    BasePage.openSearch();
    CampaignPage.SearchByScheduledCmapaign()
    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Scheduled')
  });

  it('Should Search by Sending Status Successfully', function () {
    BasePage.openSearch();
    CampaignPage.SearchBySendingStatus();
    cy.get('.example-element-row > .cdk-column-sendingStatus').should('contain', 'Sent')

  });


  it('Should Clear Successfully', function () {
    BasePage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
    BasePage.clickClear();
    cy.get('input[data-placeholder="Campaign Title"]').should('have.value', '');

  });


  it('Should Duplicate The Campaign without any changing ', function () {
    BasePage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot);
    CampaignPage.DuplicateWithoutChanging();
    cy.wait(500)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });


  it('Should Duplicate the campaign with changing from Custom to Normal ', function () {
    BasePage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.CustomOnspot)
    CampaignPage.CustomToNormal(this.CampaignData.MobileNumber)
    cy.wait(500)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });

  it('Should Duplicate the campaign with changing from Normal to Custom ', function () {
    BasePage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot)
    CampaignPage.NormalToCutom()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


  it('Should Duplicate the campaign with changing from onspot to schedual', function () {
    BasePage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot)
    CampaignPage.OnspotToScheduled();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });

  it('Should Duplicate the campaign with changing from schedual to onspot ', function () {
    BasePage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalSchedual)
    CampaignPage.ScheduledToOnspot()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


  it('Should Duplicate the campaign with changing The template ', function () {
    BasePage.openSearch();
    CampaignPage.SearchByCampaignName(this.CampaignData.randomcamp)
    CampaignPage.DuplicateChangeTemp(this.CampaignData.tempName)
    cy.wait(500);
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


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
    BasePage.openSearch();
    CampaignPage.CancelSchadualedCampaign();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Cancelled Successfully');
  });
});




