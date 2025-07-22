import 'cypress-file-upload';

class CampaignPage {

  visitCampaign() {
    //cy.visit('pages/campaigns')
    cy.get('#cdk-accordion-child-3 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(1) > .subnav-link').click();

  }
  AddNewCampaignInfoTab(CampaignName) {
    cy.contains('Create New Campaign', { timeout: 10000 }).should('be.visible').click();

    cy.get('span').contains('Select Channel').click();
    cy.contains('li', 'Hytham WhatsApp Channel').find('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains('Onspot').click();
    cy.get('span').contains('Normal').click();
    cy.get('span').contains('Next').click();
    cy.scrollTo('top');

  }
  ContactsTab(Mobilenumber) {

    cy.get('#phone').type(Mobilenumber);
    cy.get('span').contains('Add').click();
    cy.get('button').contains('Next').click({ force: true });

  }

  TemplateTab(TemplateName) {
    // 1️⃣ Click the "Select Template" to open the dropdown
    cy.get('span').contains('Select Template').click();
    // 2️⃣ Locate the real input that appears in the dropdown for searching
    // Check your app’s HTML to find the real input element inside the dropdow
    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > .list-filter > .c-input', { timeout: 5000 })
      .should('be.visible')
      .clear()
      .type(TemplateName, { force: true });
    // 3️⃣ Wait for the search results and click the matching checkbox
    cy.contains('li', TemplateName, { timeout: 5000 })
      .find('input[type="checkbox"]')
      .check({ force: true });
    // 4️⃣ Click the "+ Fill" button
    cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();
    // 5️⃣ Click "Fill"
    cy.contains('button', 'Fill').click({ force: true });



    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    //cy.get('#cdk-step-label-0-2').click();
    //cy.get('#cdk-step-label-0-3').click();

    cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click({ force: true });

  }
  customGroupCamp(CampaignName, TemplateName) {
    cy.contains('Create New Campaign', { timeout: 10000 }).should('be.visible').click();

    cy.get('span').contains('Select Channel').click();
    cy.contains('li', 'Hytham WhatsApp Channel').find('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains('Onspot').click();
    cy.get('span').contains('Customized').click();
    cy.get('span').contains('Next').click();
    //cy.scrollTo('top');
    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)
    cy.get('#groupsDD > .cuppa-dropdown > .selected-list > .c-btn').click()
    cy.get('#groupsDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1)').click()

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)
    this.TemplateTab(TemplateName);


    cy.wait(1000); // زيادة مهلة بسيطة قبل الضغط
    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count')
      .should('exist')
      .click({ force: true });

    cy.wait(500)

  }

  ScheduleCampaignInfoTab(CampaignName) {
    cy.get('span').contains('Create New Campaign').click();
    cy.get('span').contains('Select Channel').click();
    cy.contains('li', 'Hytham WhatsApp Channel').find('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains('Scheduled').click();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2); // Adds 2 days to the current date
    futureDate.setHours(10); // Sets the hour to 10 AM
    futureDate.setMinutes(0); // Sets the minutes to 00

    const day = futureDate.getDate(); // e.g., 12
    const hour = futureDate.getHours(); // e.g., 10
    const minute = futureDate.getMinutes(); // e.g., 0
    const ampm = hour >= 12 ? 'PM' : 'AM'; // determines AM/PM
    const displayHour = hour % 12 || 12; // convert to 12-hour format (e.g., 13 -> 1)
    cy.get('input[formcontrolname="sendingDateTime"]').click();

    // Step 3: Select the day
    cy.get('.mat-calendar-body-cell-content')
      .contains(new RegExp(`^\\s*${day}\\s*$`))
      .should('be.visible')
      .click();
    // Step 4: Fill in hour
    cy.get('input[formcontrolname="hour"]')
      .clear()
      .type(displayHour.toString().padStart(2, '0'));

    // Step 5: Fill in minutes
    cy.get('input[formcontrolname="minute"]')
      .clear()
      .type(minute.toString().padStart(2, '0'));

    // Step 6: Set AM/PM if needed
    cy.get('button.mat-stroked-button').then(($btn) => {
      if (!$btn.text().includes(ampm)) {
        cy.wrap($btn).click(); // toggle to correct AM/PM
      }
    });
    // Step 7: Confirm the selection
    cy.get('button mat-icon').contains('done').parents('button').click({ force: true });

    cy.get('span').contains('Normal').click();
    cy.get('span').contains('Next').click();
    cy.scrollTo('top');
  }

  SearchByCampaignName(CampaignName) {
    cy.get('input[formcontrolname="campaignName"]').type(CampaignName)
    cy.contains('button', 'Search').click();

  }

  SearchBySendingStatus() {
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains('Sent').click();

    cy.contains('button', 'Search').click();
  }

  SearchByOnspotCmapaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Onspot').click();
    cy.contains('button', 'Search').click();
  }

  SearchByScheduledCmapaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Scheduled').click();
    cy.contains('button', 'Search').click();
  }

  openSearch() {
    cy.get('div.search-form-expand-wrapper').then($wrapper => {
      const isVisible = $wrapper.css('opacity') === '1';
      if (!isVisible) {
        cy.get('.card-head-btns-wrapper > .btn-black').click();

        // Wait for the panel to become visible after clicking
        cy.get('div.search-form-expand-wrapper', { timeout: 10000 })
          .should('have.css', 'opacity', '1');
      }
    });
  }

  DuplicateWithoutChanging() {

    cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > .ng-tns-c226-17').click()
    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`; // 👈 اسم جديد تمامًا

    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')       // 🧽 يمسح القيمة القديمة
      .trigger('input')        // 🔄 يخلي Angular يحس بالتغيير
      .type(newValue, { force: true }); // ✍️ يكتب الاسم الجديد
    cy.get('span').contains('Onspot').click();


    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click();


  }

  OnspotToScheduled() {

    cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > .ng-tns-c226-17').click()
    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`; // 👈 اسم جديد تمامًا

    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')       // 🧽 يمسح القيمة القديمة
      .trigger('input')        // 🔄 يخلي Angular يحس بالتغيير
      .type(newValue, { force: true }); // ✍️ يكتب الاسم الجديد

    cy.get('span').contains('Scheduled').click();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2); // Adds 2 days to the current date
    futureDate.setHours(10); // Sets the hour to 10 AM
    futureDate.setMinutes(0); // Sets the minutes to 00

    const day = futureDate.getDate(); // e.g., 12
    const hour = futureDate.getHours(); // e.g., 10
    const minute = futureDate.getMinutes(); // e.g., 0
    const ampm = hour >= 12 ? 'PM' : 'AM'; // determines AM/PM
    const displayHour = hour % 12 || 12; // convert to 12-hour format (e.g., 13 -> 1)
    cy.get('input[formcontrolname="sendingDateTime"]').click();

    // Step 3: Select the day
    cy.get('.mat-calendar-body-cell-content')
      .contains(new RegExp(`^\\s*${day}\\s*$`))
      .should('be.visible')
      .click();
    // Step 4: Fill in hour
    cy.get('input[formcontrolname="hour"]')
      .clear()
      .type(displayHour.toString().padStart(2, '0'));

    // Step 5: Fill in minutes
    cy.get('input[formcontrolname="minute"]')
      .clear()
      .type(minute.toString().padStart(2, '0'));

    // Step 6: Set AM/PM if needed
    cy.get('button.mat-stroked-button').then(($btn) => {
      if (!$btn.text().includes(ampm)) {
        cy.wrap($btn).click(); // toggle to correct AM/PM
      }
    });
    // Step 7: Confirm the selection
    cy.get('button mat-icon').contains('done').parents('button').click({ force: true });

    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click();


  }

  ScheduledToOnspot() {

    cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > .ng-tns-c226-17').click()
    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`; // 👈 اسم جديد تمامًا

    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')       // 🧽 يمسح القيمة القديمة
      .trigger('input')        // 🔄 يخلي Angular يحس بالتغيير
      .type(newValue, { force: true }); // ✍️ يكتب الاسم الجديد

    cy.get('span').contains('Onspot').click();


    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click();


  }

  CustomToNormal(Mobilenumber) {

    cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > .ng-tns-c226-17').click()
    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`; // 👈 اسم جديد تمامًا

    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')       // 🧽 يمسح القيمة القديمة
      .trigger('input')        // 🔄 يخلي Angular يحس بالتغيير
      .type(newValue, { force: true }); // ✍️ يكتب الاسم الجديد


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

    cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click();


  }

  NormalToCutom() {
    cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > .ng-tns-c226-17').click()
    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`; // 👈 اسم جديد تمامًا

    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')       // 🧽 يمسح القيمة القديمة
      .trigger('input')        // 🔄 يخلي Angular يحس بالتغيير
      .type(newValue, { force: true }); // ✍️ يكتب الاسم الجديد


    cy.get('span').contains('Customized').click();

    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)


    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)
    cy.get('#groupsDD > .cuppa-dropdown > .selected-list > .c-btn').click()
    cy.get('#groupsDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1)').click()

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click();


  }

  DuplicateChangeTemp(TemplateName) {
    cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > .ng-tns-c226-17').click()
    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`; // 👈 اسم جديد تمامًا

    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')       // 🧽 يمسح القيمة القديمة
      .trigger('input')        // 🔄 يخلي Angular يحس بالتغيير
      .type(newValue, { force: true }); // ✍️ يكتب الاسم الجديد


    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    // تأكد أن العنصر ظاهر ومرئي بالكامل قبل الضغط
    cy.get('#templatesDD .c-btn')
      .should('exist')
      .then($btn => {
        $btn[0].click(); // native DOM click
      });

    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > .list-filter > .c-input').should('be.visible').clear().type(TemplateName);
    // 3️⃣ Wait for the search results and click the matching checkbox
    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(2)', { timeout: 5000 }).click()
    // 4️⃣ Click the "+ Fill" button
    cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();
    // 5️⃣ Click "Fill"
    cy.contains('button', 'Fill').click({ force: true });
    cy.scrollTo('bottom'); // Scrolls to bottom of the page
    cy.get('input[type="file"]').attachFile('TestImage.jpg', { force: true });



    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()


    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click();



  }









}
export default new CampaignPage();