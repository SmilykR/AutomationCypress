class LegalEntity {

    getAddLegalEntityBtn() {
        return cy.get('.k2-content.k2-active > aside.k2-active > .k2-workspace-actions > .k2-vscroll > :nth-child(1) > .nav > :nth-child(1) > .nav-link',{timeout: 7000})
    }

    getLegalEntityNameInput() {
        return cy.get('.col-md-4 > .form-group > .k-textbox', {timeout : 7000})
    }

    getLegalEntityShortNameInput() {
        return cy.get('.k2-section > :nth-child(2) > :nth-child(1) > .col-md-3 > .form-group > .k-textbox')
    }

    getLegalEntityRolesSelect() {
        return cy.get('.form-group > .k-widget > .k-multiselect-wrap')
    }

    getLegalEntityIDfield() {
        return cy.get('.col-md-2 > .form-group > .k-textbox', {timeout : 7000})
    }

    geLegalEntitySaveBtn() {
        return cy.get('.k2-entity-save')
    }
}

export default LegalEntity