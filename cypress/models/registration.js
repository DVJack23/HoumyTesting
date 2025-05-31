import Loginpage from '../models/loginpage.js';
import {checkUrl, createStep} from "../support/utilities";
import {data} from "../support/data";

const loginData = data.houmyData[0].loginpage;
let headerLogin = loginData.headerLogin;

const registrationData = data.houmyData[0].registration;
let headerRegistration = registrationData.headerRegistration;
let headerConfirmation = registrationData.headerConfirmation;
let textConfirmation = registrationData.textConfirmation;
let buttonRegistrationEmail = registrationData.buttonRegistrationEmail;
let buttonBackToLogin = registrationData.buttonBackToLogin;
let alertInvalidEmail = registrationData.alertInvalidEmail;
let alertInvalidPassword = registrationData.alertInvalidPassword;
let alertMissingPassword = registrationData.alertMissingPassword;
let alertRegistrationFailed = registrationData.alertRegistrationFailed;

class Registration {
    headerRegistration = () => cy.contains('h1', headerRegistration);
    headerConfirmation = () => cy.contains('h1', headerConfirmation);
    textConfirmation = () => cy.contains('p', textConfirmation);
    buttonRegistrationEmail = () => cy.contains('div', buttonRegistrationEmail).parent('button');
    buttonSubmitRegistration = () => cy.get('button[type="submit"]').click();
    buttonBackToLogin = () => cy.contains('a', buttonBackToLogin);
    inputEmail = () => cy.get('#email');
    inputPassword = () => cy.get('#password');
    checkboxAcceptTerms = () => cy.get('#termsAccept').parent();
    alertInvalidEmail = () => cy.contains('span', alertInvalidEmail);
    alertInvalidPassword = () => cy.contains('span', alertInvalidPassword);
    alertMissingPassword = () => cy.contains('span', alertMissingPassword);
    alertRegistrationFailed = () => cy.contains('div', alertRegistrationFailed);

    registrationViaEmail = (email, password) => {
        createStep('Check that login page is loaded');
        checkUrl('/sign-in');
        Loginpage.headerLogin(headerLogin).should('be.visible');
        Loginpage.buttonRegister().should('be.visible');
        createStep('Click the registration button');
        Loginpage.buttonRegister().click();
        createStep('Check that registration page is loaded');
        checkUrl('/sign-up');
        this.headerRegistration().should('be.visible');
        this.buttonRegistrationEmail().should('be.visible');
        createStep('Click continue with email button');
        this.buttonRegistrationEmail().click();
        createStep('Enter valid email address');
        this.inputEmail().should('be.visible');
        this.inputEmail().clear();
        this.inputEmail().type(email);
        createStep('Save email data');
        data.houmyData[0].userData.validEmail = email;
        createStep('Enter valid password');
        this.inputPassword().should('be.visible');
        this.inputPassword().clear();
        this.inputPassword().type(password);
        createStep('Save password data');
        data.houmyData[0].userData.validPassword = password;
        createStep('Click the accept terms checkbox');
        this.checkboxAcceptTerms().click();
        createStep('Submit registration');
        this.buttonSubmitRegistration().should('be.visible');
        this.buttonSubmitRegistration().click();
    }

    checkUserRegistration = () => {
        createStep('Confirm that registration was made');
        checkUrl('/confirmation');
        this.headerConfirmation().should('be.visible');
        this.textConfirmation().should('be.visible');
    }

    returnToLoginPage = () => {
        createStep('Return back to login screen');
        this.buttonBackToLogin().should('be.visible');
        this.buttonBackToLogin().click();
        checkUrl('/sign-in');
    }

    checkInvalidEmail = () => {
        createStep('Check that alert message is shown');
        this.alertInvalidEmail().should('be.visible');
        createStep('Check that user is still on registration page');
        checkUrl('/sign-up');
    }

    checkInvalidPassword = () => {
        createStep('Check that alert message is shown');
        this.alertInvalidPassword().should('be.visible');
        createStep('Check that user is still on registration page');
        checkUrl('/sign-up');
    }

    checkMissingPassword = () => {
        createStep('Check that alert message is shown');
        this.alertMissingPassword().should('be.visible');
        createStep('Check that user is still on registration page');
        checkUrl('/sign-up');
    }

    checkFailedRegistration = () => {
        createStep('Check that alert message is shown');
        this.alertRegistrationFailed().should('be.visible');
        createStep('Check that user is still on registration page');
        checkUrl('/sign-up');
    }
}

module.exports = new Registration();