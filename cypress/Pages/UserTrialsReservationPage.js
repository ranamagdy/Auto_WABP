
import BasePage from "./BasePage";  
class UserTrialsReservation  extends BasePage {
    visit() {
        cy.contains('span.nav-link-text', 'User Trials Reservation').click();
    }

    SearchByMobileNumber(mobileNumber) {
        cy.get('input[formcontrolname="mobileNo"]').clear().type(mobileNumber);
        this.clickSearch();
    }
    SearchByGovernment(government) {
        cy.get('mat-select[formcontrolname="governorateId"]').click();
        cy.get('mat-option .mat-option-text').contains(government).click();  
        this.clickSearch();   
    }

}
export default new UserTrialsReservation;