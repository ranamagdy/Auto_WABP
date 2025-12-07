import SmsCampaignPage from '../Pages/SmsCampaignPage';
import BasePage from '../Pages/BasePage';


describe('Sms Campaign tests', () => {

  BasePage.init(SmsCampaignPage, 'SmsCampaign');


  it('should login and visit SMS campaign page', function () {
    cy.log('Already logged in and on SMS Campaign page');
  });

  it('Should create Onspot campaigns with normal group Successfully', function () {

    const data = BasePage.generateSMSCampaignData(this.SmsCampaign);
    const SendingPreferences = this.SmsCampaign.SendingPreferences[0];
    const GroupType = this.SmsCampaign.GroupType[0];


    SmsCampaignPage.AddNewSmsCampaignInfoTab(data.dynamicCampaignName, SendingPreferences, GroupType);
    SmsCampaignPage.ContactsTab(data.dynamicMobileNumber);
    SmsCampaignPage.TemplateTab(data.randomTemplate);

    cy.wait(3000);
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully');


  });

  it('Should create Onspot campaigns with custom group Successfully', function () {

    const data = BasePage.generateSMSCampaignData(this.SmsCampaign)
    const SendingPreferences = this.SmsCampaign.SendingPreferences[0];
    const GroupType = this.SmsCampaign.GroupType[1];



    SmsCampaignPage.customGroupCamp(data.dynamicCampaignName, this.SmsCampaign.templateNames[1], SendingPreferences, GroupType);

    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully');


  });

  it('Should create Scheduled campaigns Successfully', function () {

    const data = BasePage.generateSMSCampaignData(this.SmsCampaign)

    SmsCampaignPage.ScheduleCampaignInfoTab(data.dynamicCampaignName);
    SmsCampaignPage.ContactsTab(data.dynamicMobileNumber);
    SmsCampaignPage.TemplateTab(data.randomTemplate);

    cy.wait(3000);
    cy.get('.mat-simple-snack-bar-content')
      .should('contain', 'Campaign Created Successfully');




  });
  it('Should Search by the Campaign Title Successfully', function () {
    BasePage.openSearch()

    SmsCampaignPage.SearchByCampaignName(this.SmsCampaign.smsCampaigns[0].CampaignName);
    cy.get('.example-element-row > .cdk-column-title').should('contain', this.SmsCampaign.smsCampaigns[0].CampaignName)

  });

  it('Should Search by Onspot Sending Type Successfully', function () {
    BasePage.openSearch()

    SmsCampaignPage.SearchBySendingStatus();

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Onspot')


  });

  it('Should Search by Sent Sending Status Successfully', function () {
    BasePage.openSearch()

    SmsCampaignPage.SearchBySendingStatus()

    cy.get('tbody[role="rowgroup"] > :nth-child(1) > .cdk-column-sendingStatus').should('contain', 'Sent')


  });

  it('Should Search by Scheduled Sending Type Successfully', function () {
    BasePage.openSearch()

    SmsCampaignPage.SearchByScheduledCmapaign()

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Scheduled')


  });
  it('Should Clear data Successfully', function () {
    BasePage.openSearch()

    SmsCampaignPage.Clearbutton()

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('have.value', '');



  });
  it('Should Duplicate The Campaign without any changing ', function () {
    SmsCampaignPage.DuplicateWithoutChanging();
    cy.wait(500)

    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });
  it('Should Duplicate the campaign with changing from onspot to schedual', function () {
    BasePage.openSearch()
    SmsCampaignPage.SearchByOnspotCmapaign();
    SmsCampaignPage.OnspotToScheduled();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });

  it('Should Duplicate the campaign with changing from schedual to onspot ', function () {

    BasePage.openSearch()

    SmsCampaignPage.SearchByScheduledCmapaign()

    SmsCampaignPage.ScheduledToOnspot()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });

  it('Should Duplicate the campaign with changing from Custom to Normal ', function () {
    BasePage.openSearch()

    SmsCampaignPage.SearchByCampaignName(this.SmsCampaign.CustomOnspot)

    SmsCampaignPage.CustomToNormal(this.SmsCampaign.MobileNumber, this.SmsCampaign.templateNames[1]);
    cy.wait(500)

    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });
  it('Should Duplicate the campaign with changing from Normal to Custom ', function () {
    BasePage.openSearch()

    SmsCampaignPage.SearchByCampaignName(this.SmsCampaign.NormalSchedual)

    SmsCampaignPage.NormalToCutom()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });
  it('Should Duplicate the campaign with changing The template ', function () {
    BasePage.openSearch()

    SmsCampaignPage.SearchByCampaignName(this.SmsCampaign.NormalSchedual)

    SmsCampaignPage.DuplicateChangeTemp(this.SmsCampaign.templateNames[2]);
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });
  it('View Button Should work correctly', function () {
    cy.log('Already logged in and on SMS Campaign page');
    cy.contains('span', 'View').first().click();
    cy.url().should('include', '/pages/smsCampaigns/report');
  });

  it('Export Contacts', function () {
    BasePage.openSearch()

    SmsCampaignPage.SearchBySendingStatus()
    cy.contains('span', 'View').click();

   BasePage.Export('Campaigns Report');

  });

});