describe('Render Tests', () => {
    beforeEach(() => {
        cy.visit('https://chefsnook.onrender.com')
        cy.contains("Allergens").dblclick()
        cy.contains("More Options").click()
        cy.url().should('eq', 'https://chefsnook.onrender.com/recipe/filters/allergens');
    })
    
    it("Page renders the banner", () => {
      cy.get('.button-image-logo').should('be.visible')
      cy.contains("Chef's Nook").should('be.visible')
      cy.get(".button-image-user").should('be.visible')
    })
  
    it("Page renders title and sections", () => {
        cy.get('.title-heading').should('be.visible')
        cy.get('.IngredientsSection').should('be.visible')
        cy.get('.tituloSeccion').should('be.visible')
        cy.get('.ingredientesList').should('be.visible')
    })
    it("Page renders all letter icons",() => {
        cy.get('.letrasButtons').should('be.visible');
    })
  })
