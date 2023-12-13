describe('Render Tests', () => {
  beforeEach(() => {
    cy.visit('https://recipesharingfrontend.onrender.com');
  })
  
  it("Main page renders the banner", () => {
    cy.get('.button-image-logo').should('be.visible')
    cy.contains("Chef's Nook").should('be.visible')
    cy.get(".button-image-user").should('be.visible')
  })

  it("Main page renders all dropdowns",() => {
    cy.contains("Ingredients").should('be.visible')
    cy.contains("Types").should('be.visible')
    cy.contains("Allergens").should('be.visible')
    cy.contains("Preparation Time").should('be.visible')
    cy.contains("Servings").should('be.visible')
  })

  it("Main page renders both carrousel",() => {
    cy.contains("Most Recent Recipes").should('be.visible')
    cy.contains("Best Rated Recipes").should('be.visible')
  })

  it("Main page renders search items", () => {
    cy.get(".search-container").should('be.visible')
    cy.get(".search-button").should('be.visible')
    cy.get(".dropdown-icon").should('be.visible')
  })

})