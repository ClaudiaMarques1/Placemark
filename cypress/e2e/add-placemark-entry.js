describe('Placemark Tests', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    context('WHEN user logs in', () => {
        before(() => {
            cy.visit('/login')
            cy.login(email, password)
        });

        /*after(() => {
            cy.request({
                // Call on GET entroes
                // Find entrie
                // Delete the entries. forEach(())
            })
        })*/

        it('User SHOULD sees Placemark logo', () => {
            cy.get('[data-icon="map-marked-alt"]')
                .should('exist').and('have.attr', 'role', 'img')
        });

        it('AND can add a placemark', () => {
            cy.get('.input')
                .should('have.attr', 'placeholder', 'Enter placemark title')
                .type('Placemark Title 1')
            cy.get('form >.button')
                .should('exist').and('have.class', 'button is-primary')
                .and('have.css', 'background-color', 'rgb(0, 209, 178)')
                .click()
        });
    });

    /*context.skip('WHEN user adds a placemark', () => {
        before(() => {
            cy.visit('/login')
            cy.login(email, password)
        });

        it('THEN user can see created Placemark', () => {

        });

        it('AND user can remove created placemark', () => {

        });
    })*/
});