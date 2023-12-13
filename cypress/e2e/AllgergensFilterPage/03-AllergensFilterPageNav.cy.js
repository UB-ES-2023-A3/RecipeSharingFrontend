describe("Navigation Tests", () => {
    beforeEach(() => {
        cy.visit('https://recipesharingfrontend.onrender.com')
        cy.contains("Allergens").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/recipe/filters/allergens');
    })

    it("Click to Log In page", () => {
        cy.get(".user-image").should('be.visible').click()
        cy.contains("Log In").should('be.visible').click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/loginRegister');
    })

    it("Click to Home Page", () => {
        cy.get(".button-image-logo").should('be.visible').click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/');
    })
})