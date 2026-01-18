import BasePage from "./BasePage";

class SlotsPage extends BasePage {
    visit() {
        cy.contains('span.nav-link-text', 'Slots').click();
    }

    selectFromTo() {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1); // يوم بعد اليوم الحالي
        const day = futureDate.getDate();

        // From & To times ثابتة
        const fromHour = 10;
        const toHour = 11;
        const minute = 0;

        const formatHour = (hour24) => {
            const ampm = hour24 >= 12 ? 'PM' : 'AM';
            const displayHour = hour24 % 12 || 12;
            return { displayHour, ampm };
        };

        const selectTime = (hour24) => {
            const time = formatHour(hour24);
            cy.get('input[formcontrolname="hour"]')
                .clear()
                .type(time.displayHour.toString().padStart(2, '0'));
            cy.get('input[formcontrolname="minute"]')
                .clear()
                .type(minute.toString().padStart(2, '0'));
            cy.get('button')
                .contains(/AM|PM/)
                .then(($btn) => {
                    if (!$btn.text().includes(time.ampm)) cy.wrap($btn).click();
                });
            cy.get('button mat-icon')
                .contains('done')
                .parents('button')
                .click({ force: true });
        };

        // ---- From ----
        cy.get(':nth-child(3) > .global-card-form-input-wrapper > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon')
            .click();
        cy.get('.mat-calendar-body-cell-content')
            .contains(new RegExp(`^\\s*${day}\\s*$`))
            .click();
        selectTime(fromHour);

        // ---- To ----
        cy.get(':nth-child(4) > .global-card-form-input-wrapper > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator')
            .click();
        cy.get('.mat-calendar-body-cell-content')
            .contains(new RegExp(`^\\s*${day}\\s*$`))
            .click();
        selectTime(toHour);
    }
    getRandomClub() {
        const clubs = this.SlotData.Clubs;
        const randomClub = Cypress._.sample(clubs);
        return randomClub;

    }
    getRandomGroupAge() {
        const AgeGroup = this.SlotData.AgeGroup;
        const randomAgeGroup = Cypress._.sample(AgeGroup);
        return randomAgeGroup;

    }

    CreateNewSlot() {
        const randomClub = this.getRandomClub();
        const randomAgeGroup = this.getRandomGroupAge();

        cy.contains('span', 'Add Slot').click();
        cy.get('mat-select[formcontrolname="clubId"]').click();
        cy.get('mat-option').contains(randomClub).click();

        cy.get('mat-select[formcontrolname="ageGroupId"]').click();
        cy.get('mat-option').contains(randomAgeGroup).click();

        this.selectFromTo();
        this.clickSave();

    }

    SearchByClub() {
        const randomClub = this.getRandomClub();

        cy.get('mat-select[formcontrolname="clubId"]').click();
        cy.get('mat-option').contains(randomClub).click();
        this. clickSearch();
        return randomClub;

    }

    SearchByAgeGroup() {
        const randomAgeGroup = this.getRandomGroupAge();
        cy.get('mat-select[formcontrolname="ageGroupId"]').click();
        cy.get('mat-option').contains(randomAgeGroup).click();
        this. clickSearch();
        return randomAgeGroup;

    }

    ChangeInAvailability() {
        cy.contains(' Available ').first().click();
        this.confirmDialog();
    }


    ChangeAvailability() {
        cy.contains(' Unavailable ').first().click();
        this.confirmDialog();
    }


}
export default new SlotsPage();