describe("Placemark Tests", () => {
    before(() => {
        cy.visit("/")
    });

    context(`WHEN user navigates to ${Cypress.config("baseUrl")}`, () => {
        it('THEN view should render for users', () => {
            cy.get('html').should('exist');
            cy.title().should('eq', 'Welcome to Placemark');
        });

        it('User SHOULD see Placemark Page title', () => {
            cy.get('.notification > .title')
                .invoke('text')
                .should('contain', 'Welcome to Placemark')
        });

        it('AND user can see Login button', () => {
            cy.get('#login')
                .should('exist')
                .should('have.attr', 'id', 'login')
                .and('have.text', ' Log in ');
            cy.get('#login')
                .invoke('attr', 'href')
                .then((url) => {
                    // cy.requests calls API's
                    /// url here eqs '/login' which is 
                    //// yielded value from HREF on login button

                    cy.request(
                        Cypress.config('baseUrl') + url
                    ).its('status').should('eq', 200);

                    cy.request(
                        Cypress.config('baseUrl') + url
                    ).its('body').should('exist');
                });
        });
    });
});