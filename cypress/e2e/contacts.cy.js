import {data} from '../support/data.js';
import Loginpage from '../models/loginpage.js';
import Dashboard from '../models/dashboard.js';
import Contacts from '../models/contacts.js';
import {createRandomEmail, createRandomName, generateRandomCzechPhoneNumber, generateValidCzechAccountNumber, generateValidICO} from '../../../ulovDomovTesting/cypress/support/utilities.js';

const newContactData = data.houmyData[0].newContactData;
let fullName = newContactData.firstName + ' ' + newContactData.lastName;

describe('Address book tests for Houmy.cz', () => {
    Object.values(data.houmyData).forEach((data) => {
        describe('Address book tests for Houmy.cz', () => {
            beforeEach(() => {
                cy.session('Login to page', () => {
                    cy.visit(data.stageUrl);
                    Loginpage.loginViaEmail(data.userData.validEmail, data.userData.validPassword);
                    Loginpage.acceptCookies();
                    Loginpage.checkUserLogin();
                });
                cy.visit('https://houmy-client.k8stage.houmy.cz/cs/app/dashboard');
            });
            it('TC-HC01: Create New Contact', ()=> {
                Contacts.openAddressBook();
                Contacts.openNewContactForm();
                Contacts.createNewContact(createRandomName(6), createRandomName(6), createRandomEmail(6), generateRandomCzechPhoneNumber());
            });
            it('TC-HC02: Creating Contact That Already Exists', () => {
                Contacts.openAddressBook();
                Contacts.openNewContactForm();
                Contacts.createDuplicateContact(newContactData.lastName, newContactData.firstName, newContactData.email, newContactData.phone);
            });
            it('TC-HC03: Add Bank Account Information to Contact', () => {
                Contacts.openAddressBook();
                Contacts.openContactByName(fullName);
                Contacts.addBankAccount(generateValidCzechAccountNumber());
            });
            it('TC-HC04: Create New Company Contact with all information', ()=> {
                Contacts.openAddressBook();
                Contacts.openNewContactForm();
                Contacts.generateIcoAndDic();
                Contacts.createNewCompanyContact(createRandomName(10), createRandomEmail(10), generateRandomCzechPhoneNumber(), newContactData.address, newContactData.ico, newContactData.dic);
            });
            it.only('TC-HC05: Search Contact in Address Book', () => {
                Contacts.openAddressBook();
                Contacts.searchContactByName(newContactData.lastName);
            });
        })
    })
})