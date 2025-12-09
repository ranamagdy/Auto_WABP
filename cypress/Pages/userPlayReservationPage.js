import 'cypress-file-upload';
import BasePage from "./BasePage";


class userPlayReservation extends BasePage {

    
//______________________________________________________Methods_________________________________________________________________
visit() {
    cy.contains('span.nav-link-text', 'User Play Reservation').click();
  }

SearchByMobilenumber(mobileNumber) {
    cy.get('input[formcontrolname="mobileNo"]').type(mobileNumber);
    this.clickSearch();
  }

SearchByGovernorate(gov) {
   cy.get(':nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
   cy.contains('mat-option', gov).click();


    this.clickSearch();
  }
  

SearchByClub(club) {
    cy.get('#mat-select-value-67').click();
    cy.contains('mat-option', club).click();
    this.clickSearch();
  }

  SearchAgegroup(agegroup) {
    cy.get('#mat-select-value-69').click();
    cy.contains('mat-option', agegroup).click();
    this.clickSearch();
  }

  ClearSearch() {
        BasePage.clickClear();
    }


}

export default new userPlayReservation();