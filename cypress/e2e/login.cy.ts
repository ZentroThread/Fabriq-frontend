describe("Login Page Test", () => {

  it("should login successfully", () => {
    cy.visit("/")

    cy.get('input[placeholder="Enter your username"]').type("owner")
    cy.get('input[placeholder="Enter your password"]').type("1234owner")

    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/dashboard")
  })

})