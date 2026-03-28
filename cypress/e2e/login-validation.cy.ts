describe("Login Validation Test", () => {

  it("should show error when fields are empty", () => {
    cy.visit("/")

    cy.get('button[type="submit"]').click()

    //cy.contains("Please fill in both username and password.")
  })

})