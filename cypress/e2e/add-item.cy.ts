describe("Items Page", () => {

  it("should load items page", () => {
    cy.visit("/")

    cy.get('input[placeholder="Enter your username"]').type("owner")
    cy.get('input[placeholder="Enter your password"]').type("1234owner")

    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/dashboard")

    cy.contains("Items").click()

    cy.contains("Add New Item").click()

    cy.contains("Add New Item").should("exist")

  })

})