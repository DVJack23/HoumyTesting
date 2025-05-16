class Header {
    headerContainer = () => cy.get('#comp-m3m4ezcd8');
    buttonLogin = (text) => this.headerContainer().contains('span', text);
    buttonRegister = (text) => this.headerContainer().contains('span', text);
    logo = () => cy.get('#comp-m3m4ezcd8_r_comp-lrtpqcxq').find('a');

}

module.exports = new Header();