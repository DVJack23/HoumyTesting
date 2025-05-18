import {checkUrl, createStep} from "../support/utilities";
import {data} from '../support/data.js';

const loginData = data.houmyData[0].loginpage;
let headerLogin = loginData.headerLogin;
let buttonLoginEmail = loginData.buttonLoginEmail;
let buttonLogout = loginData.buttonLogout;
let alertLoginFailed = loginData.alertLoginFailed;
let buttonRegister = loginData.buttonRegister;
let headerWelcomePage = loginData.headerWelcomePage;
let textWelcomeMessage = loginData.textWelcomeMessage;

class Loginpage {
    headerLogin = () => cy.contains('h1', headerLogin);
    headerWelcomePage = () => cy.contains('h2', headerWelcomePage);
    textWelcomeMessage = () => cy.contains('p', textWelcomeMessage);
    buttonLoginGoogle = () => cy.get('.S9gUrf-YoZ4jf');
    buttonLoginEmail = () => cy.contains('div', buttonLoginEmail).parent('button');
    buttonSubmitLogin = () => cy.get('button[type="submit"]');
    buttonSubmitFirstLogin = () => cy.get('button[type="submit"]');
    buttonLogout = () => cy.contains('li', buttonLogout);
    buttonRegister = () => cy.contains('a', buttonRegister)
    inputEmail = () => cy.get('#email');
    inputPassword = () => cy.get('#password');
    inputFirstName = () => cy.get('#firstName');
    inputLastName = () => cy.get('#lastName');
    dropdownEstateCount = () => cy.get('#react-select-3-input');
    selectEstateCountOptions = () => cy.get('#react-select-3-listbox');
    dashboardUserPanel = () => cy.get('.w-full').children('button');
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

    firstLogin = () => {
        createStep('Check that welcome page is loaded');
        this.headerWelcomePage().should('be.visible');
        this.textWelcomeMessage().should('be.visible');
        this.inputFirstName().should('be.visible');
        this.inputLastName().should('be.visible');
        this.dropdownEstateCount().should('be.visible');
        createStep('Fill the first name input field');
        this.inputFirstName().clear();
        this.inputFirstName().type('Lojza');
        createStep('Fill the last name input field');
        this.inputLastName().clear();
        this.inputLastName().type('Test');
        createStep('Select number of properties');
        this.dropdownEstateCount().click();
        this.selectEstateCountOptions().contains('span', '1').click();
        createStep('Submit first login form');
        this.buttonSubmitFirstLogin().should('be.visible');
        this.buttonSubmitFirstLogin().click();
        // TODO ověřit, zda bylo přihlášení dokončeno
    }

    checkUserLogin = () => {
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