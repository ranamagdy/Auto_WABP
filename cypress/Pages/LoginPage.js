///<refrence types="cypress" >
class LoginPage{
    visit(){
        cy.visit('/auth/login')
    }
    login(email,password){
        cy.login(email,password)

    }
}
export default new LoginPage();