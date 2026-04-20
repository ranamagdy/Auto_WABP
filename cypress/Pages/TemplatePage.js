import BasePage from "./BasePage";

class TemplatePage extends BasePage {

  // ==========================
  // Navigation
  // ==========================
  visit() {
    cy.contains('span.nav-link-text', 'Templates').click();
  }
  //template with no header , no variables ,no footer , no buttons.
  NoHederTemplate(Name,Category,Channel,Type,footer,Body) 
  {
    this.clickCreate();
    cy.get('input[data-placeholder="Name your Message Template"]').type(Name);
    سؤق
    cy.get('#languageDD .c-btn')
  .should('be.visible')
  .click()
    //cy.get('[role="option"]').first().click()


    
  }
  //template with text header , 1 variables ,with footer and 1 buttons (mobile number variable ).
  
  TxtHederTemplate(Name,Language,Availability,Category,Channel,Type,footer,Body) {
    
  }
  // template with image header , 2 variables ,with footer and 2 buttons. (URL variable , mobile number variable).
  ImageHederTemplate(Name,Language,Availability,Category,Channel,Type,footer,Body) 
   {
    
  }
  //template with video header , 3 variables, with footer and2 buttons. (URL variable , mobile number variable).
  VideoHederTemplate(Name,Language,Availability,Category,Channel,Type,footer,Body) 
  {
    
  }
  //template with document header , 4 variables ,with footerand 2 buttons. (URL variable , mobile number variable).
  DocumentHederTemplate(Name,Language,Availability,Category,Channel,Type,footer,Body) 
  {

 }
//template with location header , 5 variables ,with footer and 2 buttons. (URL variable , mobile number variable).
  LocationHederTemplate(Name,Language,Availability,Category,Channel,Type,footer,Body)  
   {


}
SearchForTemplateTitle(TemplateName)
{
  
}
SearchForTemplateLanguage(TemplateLanguage)
{
  
}
SearchforAvailablity(Availability)
{
}
SearchforStatus(Status)
{
}
SearchforChannel(Channel)
{
}



}
export default new TemplatePage();

