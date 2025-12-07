import 'cypress-file-upload';
import BasePage from './BasePage';

class CampaignPage extends BasePage {

  step1() {
    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click();
  }

  step2() {
    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click();
  }

  step3() {
    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
  }

  visit() {
    cy.contains('span.nav-link-text', 'Campaigns').click();
  }

  AddNewCampaignInfoTab(CampaignName, ChannelName, SendingPreferences, GroupType) {


    this.clickCreate();
    cy.get('span').contains('Select Channel').click();
    cy.contains('li', ChannelName).find('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains(SendingPreferences).click();
    cy.get('span').contains(GroupType).click();
    cy.get('span').contains('Next').click();
    //cy.scrollTo('top');
  }

  ContactsTab(Mobilenumber) {

    cy.get('#phone').type(Mobilenumber);
    this.clickAddNew();
    cy.get('button').contains('Next').click({ force: true });

  }

  TemplateTab(TemplateName) {
    cy.get('span').contains('Select Template').click();

    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > .list-filter > .c-input', { timeout: 5000 })
      .should('be.visible')
      .clear()
      .type(TemplateName, { force: true });

    cy.contains('li', TemplateName, { timeout: 5000 }).find('input[type="checkbox"]').check({ force: true });
    cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();

    cy.contains('button', 'Fill').click({ force: true });
    this.step3();
    this.clickSave();

  }

  selectFutureDateTime() {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2); // 2 days from today
    futureDate.setHours(10); // 10 AM
    futureDate.setMinutes(0); // 00 minutes

    const day = futureDate.getDate();
    const hour = futureDate.getHours();
    const minute = futureDate.getMinutes();

    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    // Open date picker
    cy.get('input[formcontrolname="sendingDateTime"]').click();

    // Pick the day (navigate month if needed)
    cy.get('body').then(($body) => {
      if ($body.find(`.mat-calendar-body-cell-content:contains(${day})`).length === 0) {
        cy.get('.mat-calendar-next-button').click();
      }

      cy.get('.mat-calendar-body-cell-content')
        .contains(new RegExp(`^\\s*${day}\\s*$`))
        .click();
    });

    // Fill the hour
    cy.get('input[formcontrolname="hour"]')
      .clear()
      .type(displayHour.toString().padStart(2, '0'));

    // Fill the minutes
    cy.get('input[formcontrolname="minute"]')
      .clear()
      .type(minute.toString().padStart(2, '0'));

    // Set AM/PM if needed
    cy.get('button')
      .contains(/AM|PM/)
      .then(($btn) => {
        if (!$btn.text().includes(ampm)) {
          cy.wrap($btn).click();
        }
      });

    // Confirm selection
    cy.get('button mat-icon').contains('done').parents('button').click({ force: true });
  }
  customGroupCamp(CampaignName, TemplateName, ChannelName, SendingPreferences, GroupType) {

    this.AddNewCampaignInfoTab(CampaignName, ChannelName, SendingPreferences, GroupType)
    this.step1();
    cy.wait(500)
    cy.get('#groupsDD > .cuppa-dropdown > .selected-list > .c-btn').click()
    cy.get('#groupsDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1)').click()

    this.step2();
    cy.wait(500)
    this.TemplateTab(TemplateName);


  }

  ScheduleCampaignInfoTab(CampaignName, ChannelName) {
    this.clickCreate();
    cy.get('span').contains('Select Channel').click();
    cy.contains('li', ChannelName).find('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains('Scheduled').click();

    this.selectFutureDateTime();

    cy.get('span').contains('Normal').click();
    cy.get('span').contains('Next').click();
    cy.scrollTo('top');
  }

  SearchByCampaignName(CampaignName) {
    cy.get('input[formcontrolname="campaignName"]').type(CampaignName)
    this.clickSearch();
  }

  SearchBySendingStatus() {
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains('Sent').click();

    this.clickSearch();
  }

  SearchByOnspotCmapaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Onspot').click();
    this.clickSearch();
  }

  SearchByScheduledCmapaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Scheduled').click();
    this.clickSearch();
  }

  duplicateAndRename() {
    cy.contains('Duplicate').click();
    cy.get('mat-dialog-container').should('be.visible');
    cy.contains('button', 'Yes').click();
    cy.wait(300);

    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newName = `Campaign-Rand-${randomSuffix}`;

    cy.get('input[formcontrolname="name"]')
      .clear({ force: true })
      .type(newName, { force: true });

    return newName;
  }


  DuplicateWithoutChanging() {

    this.duplicateAndRename();
    cy.get('span').contains('Onspot').click();


    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500);
    this.step1();

    cy.wait(500)
    this.step2();

    cy.wait(500)

    this.step3();
    cy.wait(500)

    this.clickSave();

  }

  OnspotToScheduled() {

    this.duplicateAndRename();

    cy.get('span').contains('Scheduled').click();

    this.selectFutureDateTime();
    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500);

    this.step1();
    cy.wait(500)

    this.step2();
    cy.wait(500)

    this.step3();
    cy.wait(500)



    this.clickSave();

  }

  ScheduledToOnspot() {

    this.duplicateAndRename();
    cy.get('span').contains('Onspot').click();
    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    this.step1();
    cy.wait(500)

    this.step2();
    cy.wait(500)

    this.step3();
    cy.wait(500)

    this.clickSave();

  }

  CustomToNormal(Mobilenumber) {

    this.duplicateAndRename();

    cy.get('span').contains('Normal').click();

    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)


    this.step1();
    cy.wait(500)
    this.ContactsTab(Mobilenumber)


    this.step2();
    cy.wait(500)

    this.step3();
    cy.wait(500)

    this.clickSave();

  }

  NormalToCutom() {

    this.duplicateAndRename();

    cy.get('span').contains('Customized').click();

    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    this.step1();
    cy.wait(500)
    cy.get('#groupsDD > .cuppa-dropdown > .selected-list > .c-btn').click()
    cy.get('#groupsDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1)').click()

    this.step2();
    cy.wait(500)

    this.step3();
    cy.wait(500)

    this.clickSave();

  }

  DuplicateChangeTemp(TemplateName) {
    this.duplicateAndRename();

    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    this.step1();
    cy.wait(500)

    this.step2();
    cy.wait(500)

    cy.get('#templatesDD .c-btn')
      .should('exist')
      .then($btn => {
        $btn[0].click(); // native DOM click
      });

    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > .list-filter > .c-input').should('be.visible').clear().type(TemplateName);
    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(2)', { timeout: 5000 }).click()
    cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();

    cy.contains('button', 'Fill').click({ force: true });
    cy.scrollTo('bottom');
    cy.get('input[type="file"]').attachFile('TestImage.jpg', { force: true });

    this.step3()
    this.step3()

    cy.wait(500)
    this.clickSave();

  }

  ViewCampaign() {
    cy.contains('span', 'View').first().click();

  }

  DetailsCampaign() {
    cy.contains('span', 'View').first().click();
    cy.contains('span', 'Details').first().click();


  }
  CancelSchadualedCampaign() {
   
    this.SearchByScheduledCmapaign();
    this.ViewCampaign();
    cy.contains('span', 'Cancel').click();
    this.confirmDialog();


  }


}
export default new CampaignPage(); 