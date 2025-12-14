import Teams from '../Pages/Teams';
import BasePage from '../Pages/BasePage';


describe('Teams Page Functionality', () => {

  BasePage.init(Teams, 'TeamsData');


  it('1. Search for existing team', function () {
    Teams.openSearch();
    Teams.nameInput(this.TeamsData.team.name);
    Teams.clickSearch();
    Teams.assertTeamVisible(this.TeamsData.team.name);
  });

  it('2. Clear search fields', function () {
    Teams.openSearch();
    Teams.nameInput(this.TeamsData.team.name);
    Teams.selectWorkingType('24/7');
    Teams.clickClear();
    cy.get(".mat-select-min-line").should('contain', 'All');
  });

  it('3. View team details', function () {
    Teams.clickViewFirstTeam(this.TeamsData.team.name);
    cy.url().should('include', '/teams/view');
  });

  it('4. Edit team info', function () {

    const newName = BasePage.generateDynamicName(this.TeamsData.editedTeam.name);


    Teams.openSearch();
    Teams.selectWorkingType('Custom');
    Teams.clickSearch();
    Teams.clickEdit();
    Teams.nameInput(newName);
    Teams.updateWorkingType('24/7');
    Teams.clickSave();
    cy.get('.mat-simple-snack-bar-content')
      .should('be.visible').and('contain', 'Team management details updated successfully.');
    
  });
  

  it('4. Should Export Teams', function () {
    Teams.export('Teams');

  });

});

