describe("Attendance navigation", () => {

  it("should navigate to attendance page", () => {

    cy.visit("/")

    cy.get('input[placeholder="Enter your username"]').type("owner")
    cy.get('input[placeholder="Enter your password"]').type("1234owner")

    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/dashboard")

    // Navigate using UI instead of direct URL
    cy.contains("Attendance").click()

    cy.url().should("include", "/attendance")

  })

})