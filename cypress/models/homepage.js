const {createStep, catchReq, checkReq, checkUrl} = require("../support/utilities");

class Homepage {
    infoBox = () => cy.get('#comp-m3m4ez5c1');
    infoBoxImage = () => cy.get('#img-comp-m3m4ez64');
    infoBoxHeader = (text) => cy.contains('h1', text)
    infoBoxButtonRegister = (text) => this.infoBox().contains('span', text);


    basicCheck = (infoBoxHeader, infoBoxButtonRegister) => {
        createStep('Check url');
        checkUrl('houmy.cz');

        createStep('Check that infoBox is visible');
        this.infoBox().should('be.visible');

        createStep('Check that infoBox contains header that is visible');
        this.infoBox().within(() => {
            this.infoBoxHeader(infoBoxHeader).should('be.visible');
        });

        createStep('Check that infoBox contains image that is visible');
        this.infoBox().within(() => {
            this.infoBoxImage().should('be.visible');
        });

        createStep('Check that infoBox contains visible registration button');
        this.infoBoxButtonRegister(infoBoxButtonRegister).should('be.visible');
    }


    catchBackendRequests = () => {
        createStep('Catch backend requests for homepage');
        catchReq('GET', '**/v1/access-tokens')
            .as('accessToken');
        catchReq('GET', '**/telemetry/runtime-configuration')
            .as('config');
        catchReq('GET', '**/v1/cookie-banner-settings*')
            .as('cookieSettings');
    }


    checkBackendRequests = () => {
        createStep('Check backend requests for homepage');
        checkReq('accessToken', [200]);
        checkReq('config', [200]);
        checkReq('cookieSettings', [200]);
    }
}

module.exports = new Homepage();