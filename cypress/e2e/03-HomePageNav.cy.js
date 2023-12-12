describe("Navigation Tests", () => {
    beforeEach(() => {
        cy.visit('https://recipesharingfrontend.onrender.com');
    })

    it("Click to Log In page", () => {
        cy.get(".user-image").should('be.visible').click()
        cy.contains("Log In").should('be.visible').click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/loginRegister');
    })

    it("Click to ingredients more options", () => {
        cy.contains("Ingredients").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/recipe/filters/ingredients');
    })

    it("Click to allergens more options", () => {
        cy.contains("Allergens").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/recipe/filters/allergens');
    })

    it("Click to Types more options", () => {
        cy.get('.animated-title').invoke('css', 'visibility', 'hidden');
        cy.get('.text-overlay').invoke('css', 'visibility', 'hidden');
        cy.contains("Types").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/recipe/filters/types');
    })
})