import {data} from '../support/data.js';
import Header from '../models/header.js';
import Homepage from '../models/homepage.js';
import {catchReq, checkReq, checkUrl, createStep} from "../../../ulovDomovTesting/cypress/support/utilities";

describe('Test suite for Houmy.cz', () => {
    Object.values(data.houmyData).forEach((data) => {
        describe('Basic tests', ()=> {
            beforeEach(() => {
                cy.visit('/');
            });
            it('Houmy.cz homepage is loaded correctly', () => {
                Homepage.catchBackendRequests();
                Homepage.basicCheck(data.homepage.infoBoxHeader, data.homepage.infoBoxButtonRegister);
                Homepage.checkBackendRequests();
                createStep('Check that header is visible');
                Header.headerContainer().should('be.visible');
                createStep('Check that Log in button is visble');
                Header.buttonLogin(data.header.buttonLogin).should('be.visible');
                createStep('Check that register button is visible');
                Header.buttonRegister(data.header.buttonRegister).should('be.visible');
                createStep('Check that logo is visible and contains link to homepage');
                Header.logo().should('be.visible');
                Header.logo().should('have.attr', 'href', 'https://www.houmy.cz');
            })
        })
    })
})