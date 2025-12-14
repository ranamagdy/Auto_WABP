import BasePage from "./BasePage";

class SmsCampaignPage extends BasePage {

  // ==========================
  // Navigation
  // ==========================
  visit() {
    cy.contains('span.nav-link-text', 'SMS Campaigns').click();
  }

  // ==========================
  // Steps
  // ==========================
  goToStep(stepNumber) {
    cy.get(`[id^="cdk-step-label-"][id$="-${stepNumber}"]`)
      .find('.step-count, .step-title')
      .first()
      .click({ force: true });
  }

  // ==========================
  // Step 1 – Campaign Info
  // ==========================
  fillCampaignInfo(campaignName, sendingPreferences, groupType) {
    expect(campaignName, 'Campaign Name').to.exist;

    super.clickCreate();

    cy.contains('span', 'Select Channel').click();
    cy.contains('mat-checkbox', 'SMS').click({ force: true });

    cy.get('input[data-placeholder="Name your campaign"]')
      .clear()
      .type(campaignName);

    cy.contains('span', sendingPreferences).click();
    cy.contains('span', groupType).click();

    cy.contains('span', 'Next').click();
  }

  // ==========================
  // Step 2 – Contacts
  // ==========================
  fillContacts(mobileNumber) {
    expect(mobileNumber, 'Mobile Number').to.exist;

    cy.get('#phone').clear().type(mobileNumber);
    super.clickAddNew();
    cy.contains('button', 'Next').click({ force: true });
  }

  // ==========================
  // Step 3 – Template
  // ==========================
  fillTemplate(templateName) {
    expect(templateName, 'Template Name').to.exist;

    cy.contains('span', 'Select Template').click();

    cy.get('#templatesDD .c-input')
      .clear()
      .type(templateName, { force: true });

    cy.contains('#templatesDD li', templateName)
      .find('input[type="checkbox"]')
      .check({ force: true });

    cy.contains('button', 'Fill').click({ force: true });

    this.goToStep(3);
    super.clickSave();
  }

  // ==========================
  // Date Picker
  // ==========================
  selectFutureDateTime(daysAhead = 2) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    date.setHours(10, 0);

    cy.get('input[formcontrolname="sendingDateTime"]').click();
    cy.contains('.mat-calendar-body-cell-content', date.getDate()).click();

    cy.get('input[formcontrolname="hour"]').clear().type('10');
    cy.get('input[formcontrolname="minute"]').clear().type('00');

    cy.contains('button', 'done').click({ force: true });
  }

  // ==========================
  // Duplicate Helpers
  // ==========================
  duplicateAndRename() {
    cy.contains('Duplicate').click();
    cy.contains('button', 'Yes').click();

    const newName = `Campaign-${Date.now()}`;

    cy.get('input[formcontrolname="name"]')
      .clear()
      .type(newName);

    return newName;
  }

  // ==========================
  // Search
  // ==========================
  searchByCampaignName(name) {
    cy.get('input[formcontrolname="campaignName"]').clear().type(name);
    super.clickSearch();
  }

  searchByStatus(status) {
    cy.get('#mat-select-value-1').click();
    cy.contains('.mat-option-text', status).click();
    super.clickSearch();
  }

  searchByType(type) {
    cy.get('#mat-select-value-3').click();
    cy.contains('.mat-option-text', type).click();
    super.clickSearch();
  }

  // ==========================
  // Export
  // ==========================
  exportCampaign() {
    cy.contains('span', 'View').click();
    super.export();
  }
}

export default new SmsCampaignPage();
