class CampaignPage
{
    visitCampaign()
    {
        //cy.visit('pages/campaigns')
        cy.get('#cdk-accordion-child-3 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(1) > .subnav-link').click();

    }
    AddNewCampaignInfoTab(CampaignName)
    {
        cy.get('span').contains('Create New Campaign').click();
        cy.get('span').contains('Select Channel').click();
        cy.contains('li', 'Hytham WhatsApp Channel').find('input[type="checkbox"]').check({ force: true });
        cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
        cy.get('span').contains('Onspot').click();
       cy.get('span').contains('Normal').click();
       cy.get('span').contains('Next').click();
       cy.scrollTo('top');

    }
    AddNewCampaignContactsTab(Mobilenumber)
    {
        
        cy.get('#phone').type(Mobilenumber);
        cy.get('span').contains('Add').click();
        cy.get('button').contains('Next').click({ force: true });


    }
    /*
    AddNewCampaignTemplateTab(TemplateName)
    {

        cy.get('span').contains('Select Template').click();
        cy.get('#templatesDD').type(TemplateName)
        
        cy.contains('li', 'templatewithheadetext').find('input[type="checkbox"]').check({ force: true });
        cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();
       cy.contains('button', 'Fill').click({ force: true });

        cy.get('button').contains('Next').click({ force: true });
        cy.wait(2000)
        cy.get('button').contains('Save').click({ force: true });

*/
AddNewCampaignTemplateTab(TemplateName) {
  // 1️⃣ Click the "Select Template" to open the dropdown
  cy.get('span').contains('Select Template').click();

  // 2️⃣ Locate the real input that appears in the dropdown for searching
  // Check your app’s HTML to find the real input element inside the dropdown

  
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
  cy.get('button').contains('Next').click({ force: true });

  cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click({ force: true });

}


    




}
export default new CampaignPage();