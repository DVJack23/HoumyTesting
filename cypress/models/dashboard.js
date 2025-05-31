import {data} from '../support/data.js';

const dashboardData = data.houmyData[0].dashboard;
let buttonBackToDashboard = dashboardData.buttonBackToDashboard;
let buttonLogOut = dashboardData.buttonLogOut;
let buttonMenuPortfolio = dashboardData.buttonMenuPortfolio;
let buttonMenuContacts = dashboardData.buttonMenuContacts;
let buttonMenuVerification = dashboardData.buttonMenuVerification;
let buttonAddNewPortfolio = dashboardData.buttonAddNewPortfolio;

class Dashboard {
    navbarMainMenu = () => this.buttonBackToDashboard().parent('nav');
    buttonMenuPortfolio = () => this.navbarMainMenu().contains('button', buttonMenuPortfolio);
    buttonMenuContacts = () => this.navbarMainMenu().contains('a', buttonMenuContacts);
    buttonMenuVerification = () => this.navbarMainMenu().contains('a', buttonMenuVerification);
    buttonOpenPortfolio = (name) => this.navbarMainMenu().contains('li', name);
    buttonAddNewPortfolio = () => this.navbarMainMenu().contains('button', buttonAddNewPortfolio);
    buttonUserPanel = () => cy.get('.w-full').children('button');
    buttonLogOut = () => cy.contains(buttonLogOut);
    buttonBackToDashboard = () => cy.contains('a', buttonBackToDashboard)

    openPortfolioOptions = (name) => {
        this.buttonOpenPortfolio(name).within(()=> {
            cy.get('button[type="button"]').click({force: true});
        });
    }

    showPortfolio = (name) => {
        this.buttonOpenPortfolio(name).within(()=> {
            cy.get('button[type="button"]').click({force: true});
            cy.contains('li', 'Zobrazit portfolio').click();
        })
        // TODO - Assert že je portfolio zobrazené
    }

    renamePortfolio = (name) => {
        this.buttonOpenPortfolio(name).within(()=> {
            cy.get('button[type="button"]').click({force: true});
            cy.contains('li', 'Přejmenovat portfolio').click();
        })
        // TODO - dokončit přejmenování portfolia
    }

    deletePortfolio = (name) => {
        this.buttonOpenPortfolio(name).within(()=> {
            cy.get('button[type="button"]').click({force: true});
            cy.contains('li', 'Odstranit portfolio').click();
        })

        // TODO - potvrdit smazání portfolia
    }
}

module.exports = new Dashboard();