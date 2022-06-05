describe('Placemark Tests', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    context('When user logs in', () => {
        before(() => {
            cy.visit('/')
            cy.login(email, password)
        });

        /*after(() => {
            cy.request({
                // Call on GET entroes
                // Find entrie
                // Delete the entries. forEach(())
            })
        })*/

        it('User should sees Placemark logo', () => {
            cy.get('[data-icon="map-marked-alt"]')
                .should('exist').and('have.attr', 'role', 'img')
        });

        it('AND can add a placemark', () => {
            cy.get('.input')
                .should('have.attr', 'placeholder', 'Enter placemark title')
                .type('Placemarker Title 1')


            cy.get('form >.button')
                .should('exist').and('have.class', 'button is-primary')
                .and('have.css', 'background-color', 'rgb(0, 209, 178)')
                .click()
            // Redirect after login is not
            // directing to '/dashboard'
        });
    });
});