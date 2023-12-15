describe('Render Tests', () => {
    beforeEach(() => {
        cy.visit('https://chefsnook.onrender.com')
        cy.get(".user-image").should('be.visible').click()
        cy.contains("Log In").should('be.visible').click()
        cy.url().should('eq', 'https://chefsnook.onrender.com/loginRegister');
    })
    
    it("Page renders the banner", () => {
      cy.get('.button-image-logo').should('be.visible')
      cy.contains("Chef's Nook").should('be.visible')
      cy.get(".button-image-user").should('be.visible')
    })

    it("Page renders Overlay content", () => {
        cy.get('.overlay').should('be.visible')
        cy.get('.overlay-container').should('be.visible')
        cy.get('.overlay-panel').should('be.visible')
    })

    it("Page renders Login Form", () => {
        cy.get('.loginForm').should('be.visible')
        cy.get('input[type="email"]').should('be.visible')
        cy.get('input[type="password"]').should('be.visible')
    })

    it("Page renders Register Form", () => {
        cy.get('#signUp').should('be.visible').click()
        cy.get('.registerForm').should('be.visible')
        cy.get('#registerUsernameInput').should('be.visible')
        cy.get('input[type="email"]').should('be.visible')
        cy.get('input[type="password"]').should('be.visible')
    })

  })
