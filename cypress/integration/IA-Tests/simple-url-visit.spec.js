// cypress\integration
describe('The First Test', () => {

    it('Simple URL Visit', () => {
      cy.exec('npm cache clear --force')
      cy.ntlmReset();
      cy.ntlm(Cypress.env("host"),Cypress.env("username"),Cypress.env("password"))
      cy.visit(Cypress.env("homepage"))
      cy.url().should("include","=dashboard", {timeout : 15000})
    })
})