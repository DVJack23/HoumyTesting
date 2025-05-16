import {data} from '../support/data.js';
import Loginpage from '../models/loginpage.js';
import {createRandomEmail, createRandomPassword} from "../support/utilities";

describe('Login tests for Houmy.cz', () => {
    Object.values(data.houmyData).forEach((data) => {
        describe('Login tests for Houmy.cz', () => {
            beforeEach(() => {
                cy.visit(data.stageUrl)
            });
            it('TC-HL01: Login user with valid user details', () => {
                Loginpage.loginViaEmail(data.loginpage.validEmail, data.loginpage.validPassword);
                Loginpage.checkUserLogin(data.loginpage.validEmail);
            });
            it('TC-HL02: Login user with invalid email', () => {
                Loginpage.loginViaEmail(createRandomEmail(10), createRandomPassword(10) );
                Loginpage.checkLoginFailed();
            });
            it('TC-HL03: Login user with invalid password', () => {
                Loginpage.loginViaEmail(data.loginpage.validEmail, createRandomPassword(10));
                Loginpage.checkLoginFailed();
            });
        })
    })
})