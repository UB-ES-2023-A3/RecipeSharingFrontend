describe('Banner Click Tests', () => {
    beforeEach(() => {
        cy.visit('https://recipesharingfrontend.onrender.com')
        cy.get('.animated-title').invoke('css', 'visibility', 'hidden');
        cy.get('.text-overlay').invoke('css', 'visibility', 'hidden');
        cy.contains("Types").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/recipe/filters/types');
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
        cy.visit('https://recipesharingfrontend.onrender.com')
        cy.get('.animated-title').invoke('css', 'visibility', 'hidden');
        cy.get('.text-overlay').invoke('css', 'visibility', 'hidden');
        cy.contains("Types").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://recipesharingfrontend.onrender.com/recipe/filters/types');
    })

    it("Letter is marked correctly", () => {
        cy.contains("G").should('be.visible').click()
        cy.contains('G').should('have.class', 'letraSeleccionada').should('be.visible')
    });

    it("CLick and type correctly popup", () => {
        cy.contains('Australia').click()
        cy.contains('Search').should('be.visible').click()
    })
})
