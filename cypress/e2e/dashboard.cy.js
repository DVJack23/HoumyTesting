import {data} from '../support/data.js';
import Loginpage from '../models/loginpage.js';
import Dashboard from '../models/dashboard.js';

describe('Test for main dashboard for Houmy.cz', () => {
    Object.values(data.houmyData).forEach((data) => {
        describe('Test for main dashboard for Houmy.cz', () => {
            beforeEach(() => {
                cy.session('Login to page', () => {
                    cy.visit(data.stageUrl);
                    Loginpage.loginViaEmail(data.userData.validEmail, data.userData.validPassword);
                    Loginpage.acceptCookies();
                    Loginpage.checkUserLogin();
                });
                cy.visit('https://houmy-client.k8stage.houmy.cz/cs/app/dashboard');
            });
            it('Tests of navigation menu', () => {
                Dashboard.buttonBackToDashboard().should('be.visible');
                Dashboard.buttonUserPanel().should('be.visible');
                Dashboard.buttonUserPanel().click();
                Dashboard.buttonLogOut().should('be.visible');
                Dashboard.navbarMainMenu().should('be.visible');
                Dashboard.buttonMenuPortfolio().should('be.visible');
                Dashboard.buttonMenuPortfolio().click();
                Dashboard.buttonAddNewPortfolio().should('be.visible');
                Dashboard.buttonOpenPortfolio('Praha').should('be.visible');
                Dashboard.buttonOpenPortfolio('Praha').trigger('mouseover');
                Dashboard.openPortfolioOptions('Praha');
                Dashboard.showPortfolio('Praha');
                Dashboard.buttonBackToDashboard().click();
                Dashboard.buttonMenuContacts().should('be.visible');
                Dashboard.buttonMenuContacts().click();
                Dashboard.buttonMenuVerification().should('be.visible');
                Dashboard.buttonMenuVerification().click();
                Dashboard.buttonBackToDashboard().should('be.visible');
                Dashboard.buttonBackToDashboard().click();
                Dashboard.deletePortfolio('Ostrava');
            });
        })
    })
})