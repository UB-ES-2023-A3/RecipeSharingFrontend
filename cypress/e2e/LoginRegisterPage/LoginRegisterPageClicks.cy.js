describe('Banner Click Tests', () => {
    beforeEach(() => {
        cy.visit('https://chefsnook.onrender.com')
        cy.get(".user-image").should('be.visible').click()
        cy.contains("Log In").should('be.visible').click()
        cy.url().should('eq', 'https://chefsnook.onrender.com/loginRegister');
    })

    it("Home Page User Image Pop-Up is Correct", () => {
        cy.get(".user-image").should('be.visible').click()
    });

    it("Home Page Home Page Button is Correct", () => {
        cy.get(".button-image-logo").should('be.visible').click()
    });
})

describe('Change container click Test', () => {
    beforeEach(() => {
        cy.visit('https://chefsnook.onrender.com')
        cy.get(".user-image").should('be.visible').click()
        cy.contains("Log In").should('be.visible').click()
        cy.url().should('eq', 'https://chefsnook.onrender.com/loginRegister');
    })

    it("SignUp is marked correctly", () => {
        cy.get('#signUp').should('be.visible').click()
    });

    it("Login is marked correctly", () => {
        cy.get('#signUp').should('be.visible').click()
        cy.get('#signIn').should('be.visible').click()
    })
})
