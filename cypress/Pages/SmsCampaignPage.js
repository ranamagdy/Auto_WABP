import BasePage from "./BasePage";


class SmsCampaignPage extends BasePage {

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

    cy.contains('span.nav-link-text', 'SMS Campaigns').click();

  }

  AddNewSmsCampaignInfoTab(CampaignName, SendingPreferences, GroupType) {
    super.clickCreate({ timeout: 5000 });

    cy.get('span').contains('Select Channel').click();
    cy.contains('label', 'SMS').prev('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains(SendingPreferences).click();
    cy.get('span').contains(GroupType).click();
    cy.get('span').contains('Next').click();
   // cy.scrollTo('top');

  }

  ContactsTab(Mobilenumber) {

    cy.get('#phone').type(Mobilenumber);
    super.clickAddNew({ timeout: 5000 });
    cy.get('button').contains('Next').click({ force: true });

  }


  TemplateTab(TemplateName) {
    cy.get('span').contains('Select Template').click();

    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > .list-filter > .c-input', { timeout: 5000 })
      .should('be.visible')
      .clear()
      .type(TemplateName, { force: true });
    cy.contains('li', TemplateName, { timeout: 5000 })
      .find('input[type="checkbox"]')
      .check({ force: true });
    cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();
    cy.contains('button', 'Fill').click({ force: true });

    this.step3();
    super.clickSave({ timeout: 5000 });

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

  customGroupCamp(CustomOnspot, TemplateName, SendingPreferences, GroupType) {
    
    /*

    cy.get('span').contains('Select Channel').click();
    cy.contains('label', 'SMS').prev('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CustomOnspot);
    cy.get('span').contains(SendingPreferences).click();
    cy.get('span').contains(GroupType).click();
    cy.get('span').contains('Next').click();
    //cy.scrollTo('top');
    */
    this.AddNewSmsCampaignInfoTab(CustomOnspot, SendingPreferences, GroupType);
    this.step1();

    cy.wait(500)
    cy.get('#groupsDD > .cuppa-dropdown > .selected-list > .c-btn').click()
    cy.get('#groupsDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1)').click()

    this.step2();
    cy.wait(500)
    this.TemplateTab(TemplateName);


    cy.wait(1000); // زيادة مهلة بسيطة قبل الضغط
    cy.get('.mat-simple-snack-bar-content').should('exist').click({ force: true });

    cy.wait(500)

  }


  ScheduleCampaignInfoTab(CampaignName) {
    super.clickCreate({ timeout: 5000 });
    cy.get('span').contains('Select Channel').click();
    cy.contains('label', 'SMS').prev('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains('Scheduled').click();
    this.selectFutureDateTime();
    cy.get('span').contains('Normal').click();
    cy.get('span').contains('Next').click();
    cy.scrollTo('top');
  }

  SearchByCampaignName(CampaignName) {
    cy.get('input[formcontrolname="campaignName"]').type(CampaignName)
    super.clickSearch();

  }

  SearchBySendingStatus() {
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains('Sent').click();

    super.clickSearch();
  }
  SearchByOnspotCmapaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Onspot').click();
    super.clickSearch();
  }
  SearchByCustomCampaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Custom').click();
    super.clickSearch();
  }
  SearchByScheduledCmapaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Scheduled').click();
    super.clickSearch();
  }

  Clearbutton() {

    cy.get('input[formcontrolname="campaignName"]').type('Test SMS Campaign 779');
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains('Sent').click();
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Onspot').click();
    BasePage.clickClear();
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
    cy.wait(500)

    this.step1()
    cy.wait(500)

    this.step2();
    cy.wait(500)

    this.step3();
    cy.wait(500)

    super.clickSave({ timeout: 5000 });

  }

  OnspotToScheduled() {
    this.duplicateAndRename();

    cy.get('span').contains('Scheduled').click();

    this.selectFutureDateTime();

    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)
    this.step1();
    cy.wait(500)

    this.step2();
    cy.wait(500)

    this.step3();
    cy.wait(500)

    super.clickSave({ timeout: 5000 });



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

    super.clickSave({ timeout: 5000 });

  }
  CustomToNormal(Mobilenumber) {


    cy.get('span').contains('Duplicate').click();

    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`;
    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')
      .trigger('input')
      .type(newValue, { force: true });


    cy.get('span').contains('Normal').click();



    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)


    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)
    this.ContactsTab(Mobilenumber)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    super.clickSave({ timeout: 5000 });


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
    
    super.clickSave({ timeout: 5000 });


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

     cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > .list-filter > .c-input').should('be.visible').clear().type(TemplateName).click();
    // 3️⃣ Wait for the search results and click the matching checkbox
    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > .pure-checkbox').click()
    cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();

    cy.contains('button', 'Fill').click({ force: true });
    cy.scrollTo('bottom');

    this.step3()
    this.step3()

    cy.wait(500)

    super.clickSave({ timeout: 5000 });



  }

  ExportSmsCampaign() {
    cy.contains('span', 'View').click();
    BasePage.Export();
  }

}
export default new SmsCampaignPage();