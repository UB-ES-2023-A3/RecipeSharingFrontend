describe('Banner Click Tests', () => {
    beforeEach(() => {
        cy.visit('https://chefsnook.onrender.com')
        cy.contains("Ingredients").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://chefsnook.onrender.com/recipe/filters/ingredients');
    })

    it("Home Page User Image Pop-Up is Correct", () => {
        cy.get(".user-image").should('be.visible').click()
    });

    it("Home Page Home Page Button is Correct", () => {
        cy.get(".button-image-logo").should('be.visible').click()
    });
})

describe('Letters Click Tests', () => {
    beforeEach(() => {
        cy.visit('https://chefsnook.onrender.com')
        cy.contains("Ingredients").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://chefsnook.onrender.com/recipe/filters/ingredients');
    })

    it("Letter is marked correctly", () => {
        cy.contains("D").should('be.visible').click()
        cy.contains('D').should('have.class', 'letraSeleccionada').should('be.visible')
    });

    it("CLick and ingredient correctly popup", () => {
        cy.contains('Salmon').click()
        cy.contains('Search').should('be.visible').click()
    })
})
