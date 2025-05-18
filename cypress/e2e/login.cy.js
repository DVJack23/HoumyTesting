import {data} from '../support/data.js';
import Loginpage from '../models/loginpage.js';
import Registration from '../models/registration.js';
import {createRandomEmail, createRandomPassword} from "../support/utilities";

describe('Login tests for Houmy.cz', () => {
    Object.values(data.houmyData).forEach((data) => {
        describe('Login tests for Houmy.cz', () => {
            beforeEach(() => {
                cy.visit(data.stageUrl)
            });
            it('TC-HL01: Login user with valid user details', () => {
                Loginpage.loginViaEmail(data.userData.validEmail, data.userData.validPassword);
                Loginpage.checkUserLogin();
            });
            it('TC-HL02: Login user with invalid email', () => {
                Loginpage.loginViaEmail(createRandomEmail(10), createRandomPassword(10) );
                Loginpage.checkLoginFailed();
            });
            it('TC-HL03: Login user with invalid password', () => {
                Loginpage.loginViaEmail(data.userData.validEmail, createRandomPassword(10));
                Loginpage.checkLoginFailed();
            });
            it('TC-HL04: Newly registered user can log in to the app immediately', () => {
                Registration.registrationViaEmail(createRandomEmail(10), createRandomPassword(10));
                Registration.returnToLoginPage();
                Loginpage.loginViaEmail(data.userData.validEmail, data.userData.validPassword);
                Loginpage.firstLogin();
                Loginpage.checkUserLogin();
            })
        })
    })
})