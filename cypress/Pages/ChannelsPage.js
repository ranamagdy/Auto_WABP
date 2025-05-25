class ChannelsPage{
    visitChannelPage(){
        cy.vitist('/pages/channels/index');

    }
    ChannelSync(){
        cy.get('tbody > :nth-child(1) > .cdk-column-actions').first().click();
        cy.wait(6000);
        cy.get('.mat-simple-snack-bar-content').should('be.visible');
        cy.get('.mat-simple-snack-bar-content').should('contain','All WhatsApp Templates Synced Successfully');
    }
    changetoNotactive() {
        cy.get('#cdk-accordion-child-1 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(3) > .subnav-link > .nav-link-text').click
        cy.get('#mat-slide-toggle-10 > .mat-slide-toggle-label > .mat-slide-toggle-bar').first().click();

        cy.get('.custom-moda-style').should('be.visible');
        cy.get('.btn-black').click();

    }
    changetoActive(){
        cy.get('#mat-slide-toggle-5 > .mat-slide-toggle-label > .mat-slide-toggle-bar > .mat-slide-toggle-thumb-container > .mat-slide-toggle-thumb').first().click();

        cy.get('.custom-moda-style').should('be.visible');
        cy.get('.btn-black').click();

    }


}
export default new ChannelsPage();