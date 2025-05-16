import {checkUrl, createStep} from "../support/utilities";
import {data} from '../support/data.js';

const loginData = data.houmyData[0].loginpage;
let headerLogin = loginData.headerLogin;
let buttonLoginEmail = loginData.buttonLoginEmail;
let buttonLogout = loginData.buttonLogout;
let alertLoginFailed = loginData.alertLoginFailed;

class Loginpage {
    headerLogin = () => cy.contains('h1', headerLogin);
    buttonLoginGoogle = () => cy.get('.S9gUrf-YoZ4jf');
    buttonLoginEmail = (text) => cy.contains('div', buttonLoginEmail).parent('button');
    buttonSubmitLogin = () => cy.get('button[type="submit"]').click();
    inputEmail = () => cy.get('#email');
    inputPassword = () => cy.get('#password');
    dashboardUserPanel = () => cy.get('.w-full').children('button');
    buttonLogout = () => cy.contains('li', buttonLogout);
    alertLoginFailed = () => cy.contains('div', alertLoginFailed);

    loginViaEmail = (email, password) => {
        createStep('Check that login page is loaded');
        checkUrl('/cs/sign-in');
        this.headerLogin(headerLogin).should('be.visible');
        this.buttonLoginGoogle().should('be.visible');
        this.buttonLoginEmail().should('be.visible');
        createStep('Click Continue with email button');
        this.buttonLoginEmail().click();
        createStep('Enter valid email address');
        this.inputEmail().should('be.visible');
        this.inputEmail().clear();
        this.inputEmail().type(email);
        createStep('Enter valid password');
        this.inputPassword().should('be.visible');
        this.inputPassword().clear();
        this.inputPassword().type(password);
        createStep('Click the Log in button');
        this.buttonSubmitLogin().should('be.visible');
        this.buttonSubmitLogin().click();
    }

    checkUserLogin = (email) => {
        createStep('Check that user is logged in');
        checkUrl('/cs/dashboard');
        this.dashboardUserPanel().should('be.visible');
        this.dashboardUserPanel().click();
        this.buttonLogout().should('be.visible');
    }

    checkLoginFailed = () => {
        createStep('Check that alert message is shown');
        this.alertLoginFailed().should('be.visible');
        createStep('Check that user is still on login page');
        checkUrl('/cs/sign-in');
    }
}

module.exports = new Loginpage();