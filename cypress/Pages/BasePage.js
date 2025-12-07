import LoginPage from "../Pages/LoginPage";

class BasePage {

  elements = {
    searchBtn: () => cy.contains('span', 'Search'),
    clearBtn: () => cy.contains('span', 'Clear'),
    editBtn: () => cy.contains('span', 'Edit').first(),
    deleteBtn: () => cy.contains('span', 'Delete').first(),
    addNewBtn: () => cy.contains('span', 'Add'),
    createBtn: () => cy.contains('span', 'Create'),
    saveBtn: () => cy.contains('span', 'Save'),
    exportBtn: () => cy.get('button[title="Export To Excel"]'),
  };

  clickSearch() {
    this.elements.searchBtn().click();
  }

   static clickClear() {
    cy.contains('span', 'Clear').click();
  }

  clickEdit() {
    this.elements.editBtn().click();
  }

   static Delete() {
           cy.contains('span', 'Delete').first().click();
           cy.get('.mat-dialog-container', { timeout: 8000 }).should('be.visible');
           cy.get('.mat-dialog-actions > .btn-black').click();
            }

  clickAddNew() {
    this.elements.addNewBtn({ timeout: 10000 }).click();
  }

  clickCreate() {
    this.elements.createBtn().click();
  }

  clickSave() {
    this.elements.saveBtn().click();
  }


  ActivationToggle() {
    this.elements.saveBtn().click();
  }


  confirmDialog() {

    cy.get('.mat-dialog-container', { timeout: 8000 }).should('be.visible');
    cy.get('.mat-dialog-actions > .btn-black').click();
  }


  static Export(pageName) {
      cy.get('button[title="Export To Excel"]').click();
      cy.wait(5000); // Wait for the export to complete
   
        // Wait for the file to be downloaded
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const downloadedFilename = `${pageName}_${today}.xlsx`;
    
        cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 5000 }).should('exist')
      
  } 

  static openSearch() {
    cy.get('div.search-form-expand-wrapper').then($wrapper => {
      const isVisible = $wrapper.css('opacity') === '1';
      if (!isVisible) {
        cy.get('.card-head-btns-wrapper > .btn-black').click();
        cy.get('div.search-form-expand-wrapper', { timeout: 10000 })
          .should('have.css', 'opacity', '1');
      }
    });
  }


  static init(PageName, fixtureName) {

    beforeEach(function () {

      // Load login data & perform login
      cy.fixture('LoginData').then((loginData) => {

        LoginPage.visit();
        LoginPage.login(loginData.admin.email, loginData.admin.password);

        // Confirm login succeeded
        cy.url().should('not.include', '/auth/login');
        cy.wait(2000);
      })

        // After login → Navigate to the target page
        .then(() => {
          return PageName.visit();
        })

        // Then load test data fixture
        .then(() => {
          return cy.fixture(fixtureName).then((data) => {
              
                this[fixtureName] = data;

                
                PageName[fixtureName] = data;
          });
        });

    });
  }
  static generateCampaignData(fixtureData) {
    const base = fixtureData.campaigns[0];

    const randomSuffix1 = Cypress._.random(100, 9999);
    const randomSuffix2 = Cypress._.random(100, 999);

    const dynamicCampaignName = `${base.CampaignName} ${randomSuffix1}`;
    const dynamicScheduleName = `${base.CampaignScheduleName} ${randomSuffix1}`;
    const dynamicMobileNumber = `${base.BaseMobileNumber}${randomSuffix2}`;

    const randomTemplate = Cypress._.sample(fixtureData.templateNames);

    return {
      randomSuffix1,
      randomSuffix2,
      dynamicCampaignName,
      dynamicScheduleName,
      dynamicMobileNumber,
      randomTemplate
    };

  }

  static generateDynamicName(baseName) {

    const randomSuffix = Cypress._.random(100, 999);

  
    const dynamicName = `${baseName} ${randomSuffix}`;

    return dynamicName;
  }

  static generateSMSCampaignData(fixtureData) {
    const base = fixtureData.smsCampaigns[0];

    const randomSuffix = Cypress._.random(100, 999);

    const dynamicCampaignName = `${base.CampaignName} ${randomSuffix}`;
    const dynamicScheduleName = `${base.CampaignScheduleName} ${randomSuffix}`;
    const dynamicMobileNumber = `${base.BaseMobileNumber}${randomSuffix}`;

    const randomTemplate = Cypress._.sample(fixtureData.templateNames);

    return {
      randomSuffix,
      dynamicCampaignName,
      dynamicScheduleName,
      dynamicMobileNumber,
      randomTemplate,
    }
  }

}



export default BasePage;
