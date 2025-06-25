class GroupPage {

    visit () {
        cy.visit ('https://qc-community.com/WABP_lib/AdminTool/pages/groups/index')
    }
    clickAdd() {
         cy.get('.btn btn-primary').click();
    }
   
    getgroupname() {
    cy.get('[formcontrolname="groupName"]').clear().type(groupName);
   
    }
   
   selectGroupType(groupType) {
    cy.get('#mat-select-value-1').click();
    cy.get('mat-option').contains(groupType).click();
  }
    
   clickSave() {
    cy.contains('button', 'Save', { matchCase: false }).click();
  }
   
   searchGroupByName(name) {
  cy.get('[formcontrolname="groupName"]').clear().type(groupName);
}

}
export default new GroupPage();
