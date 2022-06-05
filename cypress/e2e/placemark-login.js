describe("Placemark Tests", () => {
    context(`When user logins in to ${Cypress.config("baseUrl")}`, () => {
        before(() => {
            cy.visit("/")
            //.saveLocalStorage();
        });

        it(`User should see login`, () => {
            cy.get(`#login`).should("exist").and("have.text", " Log in ")
                .click();

            cy.url().then((url) => {
                expect(url).to.eq(Cypress.config("baseUrl") + "/login");
                cy.request(url)
                    .its('status')
                    .should('eq', 200)
            });
        });

        it(`And user can login`, () => {
            cy.login(Cypress.env('email'), Cypress.env('password'));
        });

        context.skip('Once user is logged in', () => {
            it('User sees Placemark logo', () => {
                cy.get('[data-icon="map-marked-alt"]')
                    .should('exist').and('have.attr', 'role', 'img')
            })
        })

        it('Callin on BE API yields a successful response', () => {
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
                const status = response.status;
                console.log(actual)
                console.log(status)
            });

            cy.getCookies()
                .then((cookies) => {
                    console.log(cookies)

                    if (cookies) {
                        expect(cookies).to.have.lengthOf(1);
                    } else {
                        cy.log('No cookies returned.')
                    }
                });
        });
    });
});