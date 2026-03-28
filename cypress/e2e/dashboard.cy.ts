describe("Dashboard Navigation Test", () => {

  it("should navigate to dashboard after login", () => {

    cy.visit("/")

    cy.get('input[placeholder="Enter your username"]').type("owner")
    cy.get('input[placeholder="Enter your password"]').type("1234owner")

    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/dashboard")

  })

})