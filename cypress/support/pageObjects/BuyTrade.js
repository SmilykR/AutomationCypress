class BuyTrade{

    // Instrument Selection

    getBuyTradeIssuerInput() {
        return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div.k2-wizard-content > div > div.k2-wizard-step.k2-instrumentselectorstep.k2-active > div > form > div.row.mt-2 > div.col-md-4 > fieldset > span > span > input')
    }

    getBuyTradeInstrumentTypeInput() {
        return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div.k2-wizard-content > div > div.k2-wizard-step.k2-instrumentselectorstep.k2-active > div > form > div.row.mt-2 > div:nth-child(2) > fieldset > span > span > input')
    }

    getBuyTradeInstrumentSubTypeInput() {
        return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div.k2-wizard-content > div > div.k2-wizard-step.k2-instrumentselectorstep.k2-active > div > form > div.row.mt-2 > div:nth-child(3) > fieldset > span > span > input')
    }

    getBuyTradeInstrumentInput() {
        return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div.k2-wizard-content > div > div.k2-wizard-step.k2-instrumentselectorstep.k2-active > div > form > div:nth-child(2) > div.col-md-4 > fieldset > span > span > input')
    }

    getBuyTradeNextBtn() {
        return cy.get('#workbench > div.k2-content.k2-active > aside > div.k2-workspace-commands > button:nth-child(1)')
    }

    // Details and Allocations
	
	getTradeInput() {
		return cy.get(':nth-child(1) > :nth-child(1) > .form-group > .k-widget > .k-picker-wrap > .k-input')
	}
	
	getSettleDateInput() {
		return cy.get('[data-bind="visible: showSettleDateContractual"] > .form-group > .k-widget > .k-picker-wrap > .k-input')
	}
	
	getParInput() {
		//return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div.k2-wizard-content > div > div.k2-wizard-step.k2-newtradeallocationstep.k2-active > div > section.k2-section.k2-section-marginless > div > div > div.col-md-9 > div > div:nth-child(2) > div:nth-child(1) > fieldset > span > span > input.k-formatted-value.k2-numeric.k-widget.k-input', {timeout : 10000})
        //return cy.get(".k-formatted-value.k2-numeric.k-widget.k-input")
		return cy.get("[data-bind='template: { name: tradePropertiesTemplateName }'] > div:nth-of-type(2) > div:nth-of-type(1) input:nth-of-type(1)")
	}
	
	getMarketTypeInput() {
		return cy.get('[data-bind="template: { name: tradePropertiesTemplateName }"] > :nth-child(3) > :nth-child(1) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}
	
	getTradeDocTypeInput() {
		return cy.get('[data-bind="template: { name: tradePropertiesTemplateName }"] > :nth-child(3) > :nth-child(2) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}
	
	getAgreementTypeInput() {
		return cy.get('[data-bind="template: { name: tradePropertiesTemplateName }"] > :nth-child(3) > :nth-child(4) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}
	
	getAllocationsAllvuePinnacleInput() {
		return cy.get('[data-uid="319a349d-2d94-4b8f-b9b4-b9d9cf2d25ec"] > [data-field="isSelected"]')
	}
}

export default BuyTrade