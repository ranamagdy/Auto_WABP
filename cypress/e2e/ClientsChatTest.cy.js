import ClientsChatReport from '../Pages/ClientsChatReport';
import BasePage from '../Pages/BasePage';


describe('Clients Chat Report Tests Using Fixtures', () => {

  BasePage.init(ClientsChatReport, 'ClientsChatData')

  it('Should Search by the mobile number and return related values successfully ', function () {
    ClientsChatReport.SearchByMobileNumber(this.ClientsChatData.MobileNumber);
    cy.get('td.mat-column-clientMobileNumber').should('contain.text', this.ClientsChatData.MobileNumber);



  })
  it('Should Search by the Client name and return related values successfully ', function () {
    ClientsChatReport.SearchByClientName(this.ClientsChatData.ClientName);
    cy.get('td.mat-column-clientName').should('contain.text', this.ClientsChatData.ClientName);


  })
  it('Should Search by the channel type and return related values successfully ', function () {

    ClientsChatReport.SearchByChannelType();
    cy.get('tbody > :nth-child(1) > .cdk-column-channelTypeName').should('contain', 'WhatsApp')


  })
  it('Should Search by the agent name and return related values successfully ', function () {
    ClientsChatReport.SerchByAgentName(this.ClientsChatData.AgentName)

   cy.contains('td.mat-column-agentName', 'Mohamed Desouky')

  })
  it('Should clear the fields succeefully  ', function () {
    ClientsChatReport.SearchByClientName(this.ClientsChatData.ClientName)
    ClientsChatReport.clickClear();
    cy.get('input[formcontrolname="clientName"]').should('have.value', '');

  })
  it('Should Export the data as the view of the grid  successfully ', function () {
    ClientsChatReport.export('Client Chat Report');


  })
  it('Should Naviagate to the chat page successfully ', function () {
    ClientsChatReport.ViewChat();
    cy.url().should('include', '/AdminTool/pages/clients/details/');



  })
  it('Should View the Support History successfully ', function () {
    ClientsChatReport.ViewSupportHistory();
    cy.get('#mat-dialog-0').should('contain','Support History')
    


  })

});
