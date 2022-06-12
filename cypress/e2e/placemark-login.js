const { expect } = require("chai");
const { access } = require("fs");

describe("Placemark Tests", () => {
    context(`WHEN user logins in to ${Cypress.config("baseUrl")}`, () => {
        before(() => {
            cy.visit("/login")
            //.saveLocalStorage();
        });

        it(`THEN User should see login`, () => {
            cy.get('#login')
                .should("exist").and("have.text", " Log in ");

            cy.url().then((url) => {
                expect(url).to.eq(Cypress.config("baseUrl") + "/login");
                cy.request(url)
                    .its('status')
                    .should('eq', 200)
            });
        });

        it(`AND user can login`, () => {
            cy.login(Cypress.env('email'), Cypress.env('password'));
        });

        it('Calling API SHOULD yield a successful response', () => {
            let actual;

            cy.request({
                method: 'POST',
                url: Cypress.config('baseUrl') + '/authenticate',
                body: {
                    email: Cypress.env('email'),
                    password: Cypress.env('password')
                }
            }).then((response) => {
                actual = response.body;
                // Asserting on Backend response
                // 200 OK and is Object true
                expect(response.status).to.eq(200);
                expect(actual).to.include('text', 'dashboards')
            });

            cy.getCookies()
                .then((cookies) => {
                    if (cookies) {
                        expect(cookies).to.have.lengthOf(1);
                    } else {
                        cy.log('No cookies returned.')
                    }
                });
        });

        context('WHEN user is logged in', () => {
            it('THEN user sees Placemark logo', () => {
                cy.get('[data-icon="map-marked-alt"]')
                    .should('exist').and('have.attr', 'role', 'img')
            });

            it('AND Placemarks are returned', () => {
                cy.get('div.column.box.has-text-centered')
                    .children()
                    .then((placemark) => {
                        cy.get(placemark[0]).should('exist').and('not.eq', 0);
                        cy.get(placemark[1]).should('exist').and('not.eq', 0);
                        cy.get(placemark).its('length').should('eq', 2);
                    });
            });
        });
    });
});