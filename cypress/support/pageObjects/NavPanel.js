class NavPanel{
    getEntitiesItem() {
        return cy.get('[data-ap="entities"]', {timeout : 10000})
    }

    getLegalEntitiesItem() {
        return cy.get('.k2-active > ul > :nth-child(5) > .nav-link', {timeout : 10000})
    }

    getDealsItem() {
        return cy.get('[data-ap="deals"]').children().first()
    }

    getInstrumentsItem() {
        return cy.get('[data-ap="instruments"]', {timeout : 10000})
    }
}

export default NavPanel