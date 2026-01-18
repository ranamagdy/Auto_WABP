import UserTrialsReservation from "../Pages/UserTrialsReservationPage";
import BasePage from '../Pages/BasePage';
import TermsRolesPage from "../Pages/Terms&RolesPage";
describe('User Trials Reservation Page Tests Using Fixtures', () => {

    BasePage.init(UserTrialsReservation, 'UserTrialsReservation');
    
    it('Should open User Trials Reservation page', () => {
         UserTrialsReservation.assertPageNavigation('userTrialsReservation');  // dynamically asserts URL
      });
    
    it('Search by Mobile Number', function () {
        UserTrialsReservation.SearchByMobileNumber(this.UserTrialsReservation.UserMobileNumber);
        cy.get('.mat-row > .cdk-column-mobile').should('contain', this.UserTrialsReservation.mobileNumber);

    });
    it('Search by Government', function () {
        UserTrialsReservation.SearchByGovernment(this.UserTrialsReservation.Governorate);
        cy.get('.mat-row > .cdk-column-governorate').should('contain', this.UserTrialsReservation.government);
    });
    it('should clear the search ', () => {
        UserTrialsReservation.SearchByGovernment(this.UserTrialsReservation.Governorate);
        UserTrialsReservation.clickClear();
        cy.get('mat-select[formcontrolname="governorateId"] .mat-select-value-text span').should('have.text', '');
    })

    it('should export the Excel file', () => {
        UserTrialsReservation.export('User Trials Reservation');
    })



});
