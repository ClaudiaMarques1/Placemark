// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
    Object.keys(localStorage).forEach((key) => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorage', () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

Cypress.Commands.add('login', (email, password) => {
    cy.intercept('POST', '/authenticate').as('LoginRequest');
    cy.get(`#login`).should("exist").and("have.text", " Log in ")
        .click();

    cy.get(`:nth-child(1) > .input`)
        .should('be.visible').type(email);

    cy.get(`:nth-child(2) > .input`)
        .should('be.visible').type(password);

    cy.get('[data-cy="loginButton"]')
        .should('have.class', 'button is-link')
        .and('exist')
        .then((btn) => {
            expect(btn[0].baseURI).to.eq(Cypress.config().baseUrl + '/login');
        });
    cy.get('[data-cy="loginButton"]').click();
    cy.wait('@LoginRequest')
        .then(({ response }) => {
            expect(response).to.be.an('object');
            expect(response.url).to.eq(Cypress.config('baseUrl') + '/authenticate')
        });

    cy.url().should('eq', Cypress.config('baseUrl') + '/dashboard')
})