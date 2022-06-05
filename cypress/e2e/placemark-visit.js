describe("Placemark Tests", () => {
    context("Login Page", () => {
        /*beforeEach(() => {
            
        })*/

        it(`When user navigates to ${Cypress.config("baseUrl")}`, () => {
            cy.visit("/")
        });
    });
});