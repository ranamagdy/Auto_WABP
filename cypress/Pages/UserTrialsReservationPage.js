
import BasePage from "./BasePage";  
class UserTrialsReservation  extends BasePage {
    visit() {
        cy.contains('span.nav-link-text', 'User Trials Reservation').click();
    }

    SearchByMobileNumber(mobileNumber) {
        cy.get('input[formcontrolname="mobile"]').clear().type(mobileNumber);
        BasePage.clickSearch();
    }
    SearchByGovernment(government) {
        cy.get('mat-select[formcontrolname="governorateId"]').click();
        cy.get('mat-option .mat-option-text').contains(government).click();  
        BasePage.clickSearch();   
    }

}
export default new UserTrialsReservation;