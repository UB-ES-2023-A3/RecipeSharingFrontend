
describe('Banner Click Tests', () => {
    beforeEach(() => {
        cy.visit('https://chefsnook.onrender.com');
    })

    it("Home Page User Image Pop-Up is Correct", () => {
        cy.get(".user-image").should('be.visible').click()
    });

    it("Home Page Home Page Button is Correct", () => {
        cy.get(".button-image-logo").should('be.visible').click()
    });
})

describe("Dropdown Click Tests", () => {
    beforeEach(() => {
        cy.visit('https://chefsnook.onrender.com');
    })

    it("Home Page Log In click is Correct", () => {
        cy.get(".user-image").should('be.visible').click()
        cy.contains("Log In").should('be.visible').click()
    });
    
    it("Ingredients Dropdown Hover is Correct", () => {
        cy.contains("Ingredients").dblclick()
        cy.contains("Chicken")
        cy.contains("Fish")
        cy.contains("More Options")
    });
  
    it("Allergens Dropdown Hover is Correct", () => {
        cy.contains("Allergens").dblclick()
        cy.contains("Almond")
        cy.contains("Fish")
        cy.contains("More Options")
    });
  
    it("Preparation Time Dropdown Hover is Correct", () => {
        cy.contains("Preparation Time").dblclick()
        cy.contains("15 min")
        cy.contains("30 min")
        cy.contains("45 min")
        cy.contains("60 min")
        cy.contains("90 min")
        cy.contains("120 min")
        cy.contains("180 min")
    });

    it("Types Dropdown Hover is Correct", () => {
        cy.get('.animated-title').invoke('css', 'visibility', 'hidden');
        cy.get('.text-overlay').invoke('css', 'visibility', 'hidden');
        cy.contains("Types").dblclick()
        cy.contains("Italy")
        cy.contains("Spain")
        cy.contains("United States")
        cy.contains("More Options")
    
    });

    it("Servings Dropdown Hover is Correct", () => {
        cy.contains("Servings").dblclick()
        cy.contains("1")
        cy.contains("2")
        cy.contains("4")
        cy.contains("6")
        cy.contains("12")
    });
})
