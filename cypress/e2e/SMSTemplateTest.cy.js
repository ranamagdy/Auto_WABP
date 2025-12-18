import SMSTemplate from '../Pages/SMSTemplatePage';
import BasePage from '../Pages/BasePage';
import SMSTemplatePage from '../Pages/SMSTemplatePage';


describe('Should Add New SMS Template Successfully  ', () => {

  BasePage.init(SMSTemplate, 'SMSTemplateData');

  it('Should open SMS Template page', () => {
         SMSTemplatePage.assertPageNavigation('smsTemplates');  // dynamically asserts URL
      });

  it('Should Add New SMS Template Successfully', function () {
 
    const dynamicTemplateName = BasePage.generateDynamicName(this.SMSTemplateData.TemplateName[0]);

    SMSTemplatePage.AddNewTemplate(dynamicTemplateName, this.SMSTemplateData.Body);
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Template Created Successfully')


  });

  it('Should search by Template name successfully', function () {


    SMSTemplatePage.openSearch();
    SMSTemplatePage.SearchByName(this.SMSTemplateData.TemplateName[0]);
    cy.get('tbody > :nth-child(1) > .cdk-column-name').should('contain', 'Auto SMS Template')

  })

  it('Should search by Template availability successfully', function () {


    SMSTemplatePage.openSearch();
    SMSTemplatePage.SerchByAvailablity();
    cy.get('tbody > :nth-child(1) > .cdk-column-availability').should('contain', 'Yes')

  })

  it('Should search by Channel name successfully', function () {


    SMSTemplatePage.openSearch();
    SMSTemplatePage.SerchByChannel();
    cy.get('tbody > :nth-child(1) > .cdk-column-channel').should('contain', 'SMS')

  })
  it('Should clear the data successfully', function () {


    SMSTemplatePage.openSearch();
    SMSTemplatePage.SearchByName(this.SMSTemplateData.TemplateName[0]);
    SMSTemplatePage.clickClear();
    cy.get('input[formcontrolname="templateName"]').should('have.value', '')

  })

  it('Should change the template to unavailable successfully', function () {
    SMSTemplatePage.openSearch();
    SMSTemplatePage.SerchByAvailablity();
    SMSTemplatePage.ChangeToNotAvailable()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Template deactivated successfully')


  })

  it('Should change the template to available successfully', function () {
    SMSTemplatePage.openSearch();
    SMSTemplatePage.SearchByName(this.SMSTemplateData.TemplateName[0]);
    SMSTemplatePage.ChengeToAvailable()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Template activated successfully')


  })

  it('Should Export templates successfully', function () {
    SMSTemplatePage.export('Sms Templates Report');

  })


});