export function checkUrl(url) {
    cy.url().should('include', url);
}

export function catchReq(method, url) {
    return cy.intercept(method, url);
}

export function checkReq(alias, statusCodes) {
    if (!Array.isArray(statusCodes)) {
        statusCodes = [statusCodes];
    }

    return cy.wait(`@${alias}`).then(({ response }) => {
        cy.log(`Alias: @${alias}, Status: ${response.statusCode}`);
        cy.log('Response Body:', response.body.data);
        expect(statusCodes).to.include(response.statusCode);
    });
}

export function createStep(step) {
    cy.step(step);
}

export function createRandomEmail(length) {
    const chars = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    let email = '';
    for (let i = 0; i < length; i++) {
        email += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return email + '@test.com';
}

export function createRandomPassword(length) {
    const chars = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}
