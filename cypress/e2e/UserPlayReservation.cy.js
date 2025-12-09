import userPlayReservationPage from "../Pages/userPlayReservationPage";
import BasePage from "../Pages/BasePage";
describe('User Play Reservation Page Tests Using Fixtures', () => {
    BasePage.init(userPlayReservationPage, 'userPlayReservationData');  

    it('Should search by mobile number', function () {              
        const mobileNumber = this.userPlayReservationData.mobileNumber[0];
        userPlayReservationPage.SearchByMobilenumber(mobileNumber);
        cy.get('td.mat-column-mobileNo').should('contain', mobileNumber);
    });

    it.only('Should search by all governorates', function () {
            this.userPlayReservationData.governorates.forEach((gov) => {
            userPlayReservationPage.SearchByGovernorate(gov);
            cy.get('td.mat-column-governorate').should('contain', gov);
            userPlayReservationPage.ClearSearch();
        });
    });

    it('Should search by club', function () {              
        const club = this.userPlayReservationData.club;
        userPlayReservationPage.SearchByClub(club);
        cy.get('td.mat-column-club').should('contain', club);
    });         

    it('Should search by age group', function () {              
        const agegroup = this.userPlayReservationData.agegroup;
        userPlayReservationPage.SearchAgegroup(agegroup);
        cy.get('td.mat-column-ageGroup').should('contain', agegroup);
    });         
    it('Should Clear the search', function () {
        const mobileNumber = this.userPlayReservationData.mobileNumber; 
        userPlayReservationPage.SearchByMobilenumber(mobileNumber);
        BasePage.clickClear();
        cy.get('td.mat-column-mobileNo').should('contain', '');
    });

    it('Should Export', function () {
        BasePage.Export('User Play Reservation Report');
    });     
}); 

