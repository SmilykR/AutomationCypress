class Deal {

    getAddDealBtn() {
        return cy.get('[data-ap="Add New Deal"]', {timeout : 5000})
    }

    getIssuerSelect() {
        return cy.get('.k2-section > :nth-child(2) > :nth-child(1) > :nth-child(1) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
    }

    getCreditDateInput() {
        return cy.get('.form-group > .k-widget > .k-picker-wrap > .k-input')
    }

    getDealNameInput() {
        return cy.get('[data-ap="name"]')
    }

    getDealIDfield() {
        return cy.get('[data-ap="id"]', {timeout : 10000})
    }

    getNotesInput() {
        cy.get('[data-ap="notes"]')
    }

    getSaveBtn() {
        //return cy.get('.k2-entity-save', {timeout : 10000})
        //return cy.get(".k2-btn-primary")cy.get('.k2-entity-save')
        return cy.get('.k2-content.k2-active > aside.k2-active > .k2-workspace-commands > .k2-btn-primary')
    }

}

export default Deal