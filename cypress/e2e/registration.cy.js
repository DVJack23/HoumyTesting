import {data} from '../support/data.js';
import Registration from '../models/registration.js';
import {createRandomEmail, createRandomPassword} from "../../../ulovDomovTesting/cypress/support/utilities";

describe('Registration tests for Houmy.cz', () => {
    Object.values(data.houmyData).forEach((data) => {
        describe('Registration tests for Houmy.cz', () => {
            beforeEach( ()=> {
                cy.visit(data.stageUrl)
            });
            it('TC-HR01: Register new user with valid user details', ()=> {
                Registration.registrationViaEmail(createRandomEmail(8), createRandomPassword(data.registration.minPasswordLength));
                Registration.checkUserRegistration();
                Registration.returnToLoginPage();
            });
            it('TC-HR02: Register new user with invalid email', () => {
                Registration.registrationViaEmail(data.userData.invalidEmail, createRandomPassword(10));
                Registration.checkInvalidEmail();
            });
            it('TC-HR03: Register new user with invalid password', () => {
                Registration.registrationViaEmail(createRandomEmail(10), data.userData.invalidPassword);
                Registration.checkInvalidPassword();
            });
            it('TC-HR04: Register new user without entering a password', () => {
                Registration.registrationViaEmail(createRandomEmail(10), ' ');
                Registration.checkMissingPassword();
            });
            it('TC-HR05: Register new user with already registered email', () => {
                Registration.registrationViaEmail(data.userData.validEmail, createRandomPassword(10));
                Registration.checkFailedRegistration();
            })
        })
    })
})