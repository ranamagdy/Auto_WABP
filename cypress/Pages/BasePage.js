import LoginPage from "../Pages/LoginPage";

class BasePage {

  // ==========================
  // Elements
  // ==========================
  elements = {
    searchBtn: () => cy.contains('span', 'Search'),
    clearBtn: () => cy.contains('span', 'Clear'),
    editBtn: () => cy.contains('span', 'Edit').first(),
    deleteBtn: () => cy.contains('span', 'Delete').first(),
    addNewBtn: () => cy.contains('span', 'Add'),
    createBtn: () => cy.contains('span', 'Create'),
    saveBtn: () => cy.contains('span', 'Save'),
    cancelBtn: () => cy.contains('span', 'Agents'),
    exportBtn: () => cy.get('button[title="Export To Excel"]'),
    dialog: () => cy.get('.mat-dialog-container', { timeout: 8000 }),
    dialogConfirm: () => cy.get('.mat-dialog-actions > .btn-black'),
    searchPanel: () => cy.get('div.search-form-expand-wrapper'),
    toggleSearchBtn: () => cy.get('.card-head-btns-wrapper > .btn-black')
  };


  // ==========================
  // Click Actions (Instance)
  // ==========================
  clickSearch() {
    this.elements.searchBtn().click();
  }

  clickClear() {
    this.elements.clearBtn().click();
  }

  clickCancel() {
    this.elements.cancelBtn().click();
  }

  clickEdit() {
    this.elements.editBtn().click();
  }

  clickAddNew() {
    this.elements.addNewBtn().click();
  }

  clickCreate() {
    this.elements.createBtn().click();
  }

  clickSave() {
    this.elements.saveBtn().click();
  }


  // ==========================
  // Deleteeeee
  // ==========================
  deleteFirstRow() {
    this.elements.deleteBtn().click();
    this.elements.dialog().should('be.visible');
    this.elements.dialogConfirm().click();
  }


  // ==========================
  // Confirm Dialog
  // ==========================
  confirmDialog() {
    this.elements.dialog().should('be.visible');
    this.elements.dialogConfirm().click();
  }


  // ==========================
  // Search Panel Toggle
  // ==========================
  openSearch() {
    this.elements.searchPanel().then(($wrapper) => {
      if ($wrapper.css('opacity') !== '1') {
        this.elements.toggleSearchBtn().click();
        this.elements.searchPanel().should('have.css', 'opacity', '1');
      }
    });
  }


  // ==========================
  // Export to Excel
  // ==========================
  export(pageName) {
    this.elements.exportBtn().click();

    const today = new Date().toLocaleDateString('en-CA').replace(/-/g, '');

    const fileName = `${pageName}_${today}.xlsx`;

    cy.readFile(`cypress/downloads/${fileName}`, { timeout: 10000 })
      .should('exist');
  }


  // ==========================
  // Page INIT (Best Practice)
  // ==========================
  static init(PageClass, fixtureName) {
    beforeEach(function () {

      // Load & login
      cy.fixture('LoginData').then((loginData) => {
        LoginPage.visit();
        LoginPage.login(loginData.admin.email, loginData.admin.password);

        cy.url().should('not.include', '/auth/login');
        cy.wait(2000);
      })

        // Navigate to page
        .then(() => PageClass.visit())

        // Load fixture
        .then(() => {
          return cy.fixture(fixtureName).then((data) => {
            this[fixtureName] = data;
            PageClass[fixtureName] = data; 
            
          });
        });
    });
  }


  // ==========================
  // Visit Assertions
  // ==========================

  assertPageNavigation(pageName) {
  if (!pageName) throw new Error('pageName is required');

  // Assuming baseUrl from Cypress config
  const expectedUrlPart = `/${pageName}`;

  cy.url().should('include', expectedUrlPart);
}


  // ==========================
  // Dynamic Data Helpers
  // ==========================
  static generateDynamicName(baseName) {
    const random = Cypress._.random(100, 9999);
    return `${baseName} ${random}`;
  }

  static generateDynamicEmail(baseEmail) {
  const random = Cypress._.random(1000, 9999); // 4 digits
  return baseEmail.replace('@', `${random}@`);
}


  static generateCampaignData(fixtureData) {
    const base = fixtureData.campaigns[0];
    const rnd = Cypress._.random(100, 9999);

    return {
      campaignName: `${base.CampaignName} ${rnd}`,
      scheduleName: `${base.CampaignScheduleName} ${rnd}`,
      mobileNumber: `${base.BaseMobileNumber}${Cypress._.random(100, 999)}`,
      template: Cypress._.sample(fixtureData.templateNames),
    };
  }

  static generateSMSCampaignData(fixtureData) {
    const base = fixtureData.smsCampaigns[0];
    const rnd = Cypress._.random(100, 999);

    return {
      campaignName: `${base.CampaignName} ${rnd}`,
      scheduleName: `${base.CampaignScheduleName} ${rnd}`,
      mobileNumber: `${base.BaseMobileNumber}${rnd}`,
      template: Cypress._.sample(fixtureData.templateNames),
    };
  }

}

export default BasePage;
