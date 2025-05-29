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
       // cy.get('.dropdown-class').eq(1).scrollIntoView().click(); // second element (index starts at 0)
      cy.get('.c-btn').eq(1).scrollIntoView().click();
      //cy.get('span').contains('Choose from the Contacts Groups').scrollIntoView().should('be.visible')
     //cy.get('.c-btn').should('be.visible').first().click();
    //cy.get('.pure-checkbox ng-star-inserted selected-item').first().click();
        cy.get('#phone').type(Mobilenumber);
        cy.get('span').contains('Add').click();
       cy.get('#cdk-step-content-0-1 > .card-head-btns-add-campain-wrapper > .mat-stepper-next').click();


    }
    AddNewCampaignTemplateTab(TemplateName)
    {
        cy.get('span').contains('Select Template').click();
        cy.get('#templatesDD').type(TemplateName)
        cy.contains('li', 'templatewithheadetext').find('input[type="checkbox"]').check({ force: true });
        cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();
       cy.get('#cdk-step-content-0-2 > .card-head-btns-add-campain-wrapper > .mat-stepper-next').click();
       cy.get('#cdk-step-content-0-3 > .card-head-btns-add-campain-wrapper > .btn-black > span').click();


    }




}
export default new CampaignPage();