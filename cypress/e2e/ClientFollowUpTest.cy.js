import BasePage from '../Pages/BasePage';
import ClientFollowUpPage from '../Pages/ClientFollowUpPage';

describe('Client Follow-Up Page Tests Using Fixtures', () => {

    // Initialize page & fixture
    BasePage.init(ClientFollowUpPage,'ClientFollowUpData')

    it('Should open Client Follow-Up page', () => {
       ClientFollowUpPage.assertPageNavigation('clientFollowUps');  // dynamically asserts URL
    });

    it('Should Sent Message Successfully With Valid Data ', function () {
        const randomMobile = this.ClientFollowUpData.MobileNumber[
            Math.floor(Math.random() * this.ClientFollowUpData.MobileNumber.length)
        ];
        const Template = this.ClientFollowUpData.Template
        const Channel = this.ClientFollowUpData.ChannelName
        ClientFollowUpPage.SendMessage(Channel, Template, randomMobile);
        cy.get('.mat-simple-snack-bar-content')
          .should('contain', 'Message sent successfully');

    })


    it('Should show validation messages when clicking Save without filling mandatory fields', function () {
        ClientFollowUpPage.ValidationMessages()
        cy.contains('span', 'Please Select')
          .should('be.visible');


    })

    it('Check the validation on the mobile number when enter invalid mobile number  ', function () {
        const Template = this.ClientFollowUpData.Template
        const Channel = this.ClientFollowUpData.ChannelName
        const invalidNum = this.ClientFollowUpData.InvalidMobileNumber

        ClientFollowUpPage.MobileValidation(Channel, Template, invalidNum)
        cy.contains('span', 'Mobile Number is Invalid')
          .should('be.visible');


    })
    it('Should return the related data when search by valid mobile number  ', function () {
        
        ClientFollowUpPage.SearchByMobileNum(this.ClientFollowUpData.SearchNum)
        cy.get('tbody > :nth-child(1) > .cdk-column-mobileNumber')
          .should('contain', this.ClientFollowUpData.SearchNum);


    })
    it('Should clear the search successfully  ', function () {
        ClientFollowUpPage.SearchByMobileNum(this.ClientFollowUpData.SearchNum)
        ClientFollowUpPage.clickClear();
        cy.get('tbody > :nth-child(1) > .cdk-column-mobileNumber')
          .should('contain', ' ');



    })
    
    it('Export the data in excel file successfuly  ', function () {
        ClientFollowUpPage.export('Client Follow Ups');

    })


});