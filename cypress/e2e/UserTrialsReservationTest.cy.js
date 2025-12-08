import UserTrialsReservation from "../Pages/UserTrialsReservationPage";
import BasePage from '../Pages/BasePage';
describe('User Trials Reservation Page Tests Using Fixtures', () => {

    BasePage.init(UserTrialsReservation, 'UserTrialsReservationData');
    it('Search by Mobile Number', function () {
        BasePage.openSearch();
        UserTrialsReservation.SearchByMobileNumber(this.UserTrialsReservationData.mobileNumber);
        cy.get('.mat-row > .cdk-column-mobile').should('contain', this.UserTrialsReservationData.mobileNumber);

    });
    it('Search by Government', function () {
        BasePage.openSearch();
        UserTrialsReservation.SearchByGovernment(this.UserTrialsReservationData.government);
        cy.get('.mat-row > .cdk-column-governorate').should('contain', this.UserTrialsReservationData.government);
    });
    it('should clear the search ', () => {
        UserTrialsReservation.SearchByGovernment(this.UserTrialsReservationData.government);
        BasePage.clickClear();
        cy.get('mat-select[formcontrolname="governorateId"] .mat-select-value-text span').should('have.text', '');
    })

    it('should export the Excel file', () => {
        // Click the Export to Excel button
        BasePage.Export('User Trials Reservation');
    })



});
