import BasePage from "../Pages/BasePage";
import SlotsPage from "../Pages/SlotsPage";


describe('Slots Page Tests Using Fixtures', () => {
    BasePage.init(SlotsPage, 'SlotData');
it('Should open Slots page', () => {
       SlotsPage.assertPageNavigation('slots');  // dynamically asserts URL
    });

it('Should create a new slot successfully',function(){

     SlotsPage.CreateNewSlot();
     cy.get('.mat-simple-snack-bar-content').should('contain', 'Slot created successfully');

});
it('Should show validation messages when clicking Save without filling mandatory fields', () => {
        SlotsPage.clickAddNew();
        SlotsPage.clickSave();
    
        const validationMessages = [
          'Please Enter Club',
          'Please Enter Age Group',
          'Please Enter From Date',
          'Please Enter To Date'
        ];
    
        validationMessages.forEach(message => {
          cy.contains(message).should('be.visible');
        });
    
      });

it('Should search by club successfully', function () {

    const selectedClub = SlotsPage.SearchByClub();
    cy.get('td.mat-column-clubName', { timeout: 10000 }).should('exist');
    cy.get('td.mat-column-clubName').first().should('contain.text', selectedClub);

});


it('Should Search By the Age group successfully ',function(){
    const selectedAgeGroup = SlotsPage.SearchByAgeGroup();
    cy.get('td.mat-column-ageGroupName', { timeout: 10000 }).should('exist');
    cy.get('td.mat-column-ageGroupName').first().should('contain.text', selectedAgeGroup);

});

it('Should Change to InActive successfully ',function(){
    SlotsPage.ChangeInAvailability();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Slot deactivated successfully')


});
it('Should Change to Active successfully ',function(){
    SlotsPage.ChangeAvailability()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Slot activated successfully')


});
it('Should Export the data successfully ',function(){
    BasePage.Export('Slot');

});
it('Should Clear the search successfully', function () {

    const selectedClub = SlotsPage.SearchByClub();
    BasePage.clickClear();
    cy.get('mat-select[formcontrolname="clubId"]').should('contain', 'All')


});



})