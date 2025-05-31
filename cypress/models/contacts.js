import {data} from '../support/data.js';
import Dashboard from '../models/dashboard.js';
import {checkUrl, createStep, generateValidICO} from "../support/utilities";

const contactsData = data.houmyData[0].contacts;
let headerContacts = contactsData.headerContacts;
let headerUpdateContact = contactsData.headerUpdateContact;
let headerSearchContact = contactsData.headerSearchContact;
let alertContactUpdated = contactsData.alertContactUpdated;
let buttonCreateNewContact = contactsData.buttonCreateNewContact;
let buttonSearchContact = contactsData.buttonSearchContact;
let buttonCloseSearch = contactsData.buttonCloseSearch;
let buttonAddInformation = contactsData.buttonAddInformation;
let headerCreateNewContact = contactsData.headerCreateNewContact;
let alertNewContactCreated = contactsData.alertNewContactCreated;
let alertFailedToCreateContact = contactsData.alertFailedToCreateContact;
let headerContactDetails = contactsData.headerContactDetails;
let boxContactBankDetails = contactsData.boxContactBankDetails;
let inputIsCompany = contactsData.inputIsCompany;
let inputMoreInfo = contactsData.inputMoreInfo;

const newContactData = data.houmyData[0].newContactData;

class Contacts {
    headerContacts = ()=> cy.contains('h1', headerContacts);
    headerCreateNewContact = () => cy.contains('h2', headerCreateNewContact);
    headerContactDetails = () => cy.contains('p', headerContactDetails);
    headerUpdateContact = () => cy.contains('h2', headerUpdateContact);
    headerSearchContact = () => cy.contains('h2', headerSearchContact);
    boxContactBankDetails = () => cy.contains('p', boxContactBankDetails).closest('section');
    boxContactInfo = (name) => cy.contains('p', name).closest('div[class*="group/datagrid"]');
    boxSearchResult = (name) => cy.contains('span', name).closest('a');
    alertNewContactCreated = () => cy.contains('div', alertNewContactCreated);
    alertFailedToCreate = () => cy.contains('div', alertFailedToCreateContact);
    alertContactUpdated = () => cy.contains('div', alertContactUpdated);
    buttonCreateNewContact = () => cy.contains('button', buttonCreateNewContact);
    buttonSearchContact = () => cy.contains('button', buttonSearchContact);
    buttonCloseSearch = () => cy.contains('button', buttonCloseSearch);
    buttonContactOptions = (name) => this.boxContactInfo(name).find('div.w-fit > button');
    buttonShowContactDetails = (name) => this.boxContactInfo(name).get('li').contains('Zobrazit detail kontaktu');
    buttonEditContactDetails = (name) => this.boxContactInfo(name).get('li').contains('Upravit kontakt');
    buttonSaveNewContact = () => cy.get('button[type="submit"]');
    buttonAddInformation = () => cy.contains('div', buttonAddInformation);
    inputSearchBar = () => cy.get('input[type="text"]');
    inputIsCompany = () => cy.contains('label', inputIsCompany);
    checkboxIsCompany = () => cy.get('#isCompany');
    inputMoreInfo = () => cy.contains('label', inputMoreInfo);
    checkboxMoreInfo = () => cy.get('#isMoreInfo');
    inputLastname = () => cy.get('#lastName');
    inputFirstname = () => cy.get('#firstName');
    inputCompanyName = () => cy.get('#companyName');
    inputEmail = () => cy.get('#email');
    inputPhone = () => cy.get('input[type="tel"]');
    inputAddress = () => cy.contains('label', 'Adresa').parent().find('input[role="combobox"]');
    optionAddressOne = (address) =>  cy.contains('#react-select-2-option-0', address);
    inputIco = () => cy.get('#ico');
    inputDic = () => cy.get('#dic');
    inputPrefix = () => cy.get('#prefix');
    inputAccount = () => cy.get('#account');
    inputBankCode = () => cy.get('input[name="bankCode"]').closest('div');

    openAddressBook = () => {
        createStep('Open the address book.')
        Dashboard.buttonMenuContacts().click();
        createStep('Check that address book is opened.')
        this.headerContacts().should('be.visible');
        checkUrl('/app/contact');
    }

    openContactByName = (name) => {
        createStep('Open selected contact details');
        this.boxContactInfo(name).should('be.visible');
        this.boxContactInfo(name).click();
    }

    searchContactByName = (name) => {
        createStep('Click on the search bar and open the search page.')
        this.buttonSearchContact().should('be.visible');
        this.buttonSearchContact().click();
        createStep('Check that search page is opened.');
        this.headerSearchContact().should('be.visible');
        this.inputSearchBar().should('be.visible');
        createStep('Type your contacts name in to the search bar.');
        this.inputSearchBar().clear();
        this.inputSearchBar().type(name);
        createStep('Check that searched contact is shown');
        this.boxSearchResult(name).should('be.visible')
            .and('have.attr', 'href')
            .and('include', '/app/contact/');
    }

    openNewContactForm = () => {
        createStep('Check that address book is opened.')
        this.headerContacts().should('be.visible');
        createStep('Open create new contact form');
        this.buttonCreateNewContact().should('be.visible');
        this.buttonCreateNewContact().click();
    }

    generateIcoAndDic = () => {
        newContactData.ico = generateValidICO();
        newContactData.dic = 'CZ' + newContactData.ico;
    }

    createNewCompanyContact = (companyName, email, phone, address, ico, dic) => {
        createStep('Check that new contact creation window is opened.')
        this.headerCreateNewContact().should('be.visible');
        createStep('Click the is company button');
        this.inputIsCompany().should('be.visible');
        this.inputIsCompany().click();
        this.checkboxIsCompany().should('be.checked');
        createStep('Fill the company name input field');
        this.inputCompanyName().should('be.visible');
        this.inputCompanyName().clear();
        this.inputCompanyName().type(companyName);
        createStep('Fill the email input field');
        this.inputEmail().should('be.visible');
        this.inputEmail().clear();
        this.inputEmail().type(email);
        createStep('Fill the phone number input field');
        this.inputPhone().should('be.visible');
        this.inputPhone().clear();
        this.inputPhone().type(phone);
        createStep('Click the add more details button');
        this.inputMoreInfo().should('be.visible');
        this.inputMoreInfo().click();
        this.checkboxMoreInfo().should('be.checked');
        createStep('Fill the address input field');
        this.inputAddress().should('be.visible');
        this.inputAddress().clear();
        this.inputAddress().type(address);
        this.optionAddressOne(address).should('be.visible');
        this.optionAddressOne(address).click();
        createStep('Fill the ICO input field');
        this.inputIco().should('be.visible');
        this.inputIco().clear();
        this.inputIco().type(ico);
        createStep('Fill the DIC input field');
        this.inputDic().should('be.visible');
        this.inputDic().clear();
        this.inputDic().type(dic);
        createStep('Confirm form and save new contact');
        this.buttonSaveNewContact().should('be.visible');
        this.buttonSaveNewContact().click();
        createStep('Check that contact was created.')
        checkUrl('/app/contact');
        this.alertNewContactCreated().should('be.visible');
        this.headerContacts().should('be.visible');
        this.boxContactInfo(companyName).should('be.visible');
    }


    addBankAccount = (accountNumber) => {
        createStep('Check that contact details page is opened.')
        this.headerContactDetails().should('be.visible');
        this.boxContactBankDetails().should('be.visible');
        createStep('Click the add bank information button.');
        this.buttonAddInformation().should('be.visible');
        this.buttonAddInformation().click();
        createStep('Check that contact update page is opened.')
        this.headerUpdateContact().should('be.visible');
        this.inputPrefix().should('be.visible');
        this.inputAccount().should('be.visible');
        this.inputBankCode().should('be.visible');
        createStep('Fill the prefix input field');
        this.inputPrefix().clear();
        this.inputPrefix().type('1234');
        createStep('Fill the account number input field');
        this.inputAccount().clear();
        newContactData.accountNumber = accountNumber;
        this.inputAccount().type(accountNumber);
        createStep('Fill the bank code input field');
        this.inputBankCode().type('0300{enter}');
        createStep('Confirm and save changes.');
        this.buttonSaveNewContact().should('be.visible');
        this.buttonSaveNewContact().click();
        createStep('Check that contact details were updated.')
        this.alertContactUpdated().should('be.visible');
        this.headerContactDetails().should('be.visible');
        this.boxContactBankDetails().should('be.visible');
        let fullAccountNumber = newContactData.accountPrefix + '-' + newContactData.accountNumber + '/' + newContactData.accountBankCode;
        this.boxContactBankDetails().contains(fullAccountNumber);
    }

    createNewContact = (lastname, firstname, email, phone) => {
        createStep('Check that new contact creation window is opened.')
        this.headerCreateNewContact().should('be.visible');
        createStep('Fill the last name input field.');
        this.inputLastname().should('be.visible');
        this.inputLastname().clear();
        this.inputLastname().type(lastname);
        newContactData.lastName = lastname;
        createStep('Fill the first name input field.');
        this.inputFirstname().should('be.visible');
        this.inputFirstname().clear();
        this.inputFirstname().type(firstname);
        newContactData.firstName = firstname;
        createStep('Fill the email input field.');
        this.inputEmail().should('be.visible');
        this.inputEmail().clear();
        this.inputEmail().type(email);
        newContactData.email = email;
        createStep('Fill the phone input field.');
        this.inputPhone().should('be.visible');
        this.inputPhone().clear();
        this.inputPhone().type(phone);
        newContactData.phone = phone;
        createStep('Confirm contact creation form.')
        this.buttonSaveNewContact().should('be.visible');
        this.buttonSaveNewContact().click();
        createStep('Check that contact was created.')
        checkUrl('/app/contact');
        this.alertNewContactCreated().should('be.visible');
        this.headerContacts().should('be.visible');
        let fullName = newContactData.firstName +' '+ newContactData.lastName;
        this.boxContactInfo(fullName).should('be.visible');
    }

    createDuplicateContact = (lastname, firstname, email, phone) => {
        createStep('Check that new contact creation window is opened.')
        this.headerCreateNewContact().should('be.visible');
        createStep('Fill the last name input field.');
        this.inputLastname().should('be.visible');
        this.inputLastname().clear();
        this.inputLastname().type(lastname);
        createStep('Fill the first name input field.');
        this.inputFirstname().should('be.visible');
        this.inputFirstname().clear();
        this.inputFirstname().type(firstname);
        createStep('Fill the email input field.');
        this.inputEmail().should('be.visible');
        this.inputEmail().clear();
        this.inputEmail().type(email);
        createStep('Fill the phone input field.');
        this.inputPhone().should('be.visible');
        this.inputPhone().clear();
        this.inputPhone().type(phone);
        createStep('Confirm contact creation form.')
        this.buttonSaveNewContact().should('be.visible');
        this.buttonSaveNewContact().click();
        createStep('Check that contact was not created.')
        checkUrl('/app/contact');
        this.alertFailedToCreate().should('be.visible');
    }
}

module.exports = new Contacts();
