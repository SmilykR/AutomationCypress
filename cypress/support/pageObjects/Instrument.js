class Instrument {
    
    getInstrumentsSearchBar() {
        return cy.get('#instruments .k-textbox', {timeout : 25000})
    }
    
    getAddInstrumentBtn() {
        return cy.get('[data-ap="Add Instrument"]', {timeout : 5000})
    }

    // General Information

    getIssuerInput() {
        return cy.get('[data-bind="visible: $root.isNew"] > .k-widget > .k-dropdown-wrap > .k-input', {timeout : 35000})
    }

    getInstrumentNameInput() {
        return cy.get(':nth-child(2) > .col-4 > .form-group > .k-textbox', {timeout : 35000})
    }

    getInstrumentTypeInput() {
        return cy.get('.k2-section > :nth-child(2) > :nth-child(1) > :nth-child(2) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
        }
        
    getInstrumentSubTypeInput() {
        return cy.get(':nth-child(3) > [data-bind="if: $root.isNew"] > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
    }

    getIssueDateInput() {
        return cy.get(':nth-child(2) > :nth-child(2) > :nth-child(2) > .form-group > .k-widget > .k-picker-wrap > .k-input')
    }

    getFirstSettleDateInput() {
        return cy.get(':nth-child(3) > :nth-child(1) > .form-group > .k-widget > .k-picker-wrap > .k-input')
    }

    getInterestAccrualDateInput() {
        return cy.get(':nth-child(3) > :nth-child(2) > .form-group > .k-widget > .k-picker-wrap > .k-input')
    }

    getFirstPaymentDateInput() {
        return cy.get('[data-bind="visible: $root.showFirstPaymentDate"] > .form-group > .k-widget > .k-picker-wrap > .k-input')
    }

    getMaturityDateInput() {
        return cy.get(':nth-child(4) > .form-group > .k-widget > .k-picker-wrap > .k-input')
    }

    getOriginalIssuePriceInput() {
        //return cy.get('[data-ap="originalIssuePrice"]')
        return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > div:nth-child(1) > div.col-xl-9.col-12 > div > section > div > div:nth-child(2) > div:nth-child(3) > fieldset > span > span', {timeout : 7000})
    }

    getOriginalGlobalAmountInput() {
        //return cy.get('[data-ap="originalGlobalAmount"]')
        return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > div:nth-child(1) > div.col-xl-9.col-12 > div > section > div > div:nth-child(2) > div:nth-child(4) > fieldset > span > span', {timeout : 7000})
    }

    getCurrencyInput() {
        return cy.get(`#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > div:nth-child(1) > div.col-xl-9.col-12 > div > section > div > div:nth-child(2) > div:nth-child(5) > fieldset > span > span > input`, {timeout : 7000})
    }

    // General Information / Calculation Properties

    getPriceFactorInput() {
        return cy.get('[data-bind="template: { name: calculationProperties.templateName, data: calculationProperties }"] > :nth-child(1) > .col-4 > .form-group > .k-widget > .k-dropdown-wrap > .k-input', {timeout : 7000})
    }
    
    getTradesWAccrualInterestInput() {
        return cy.get(':nth-child(1) > .col-5 > .form-group > .k-widget > .k-dropdown-wrap > .k-input', {timeout : 7000})
    }
    
    getEOMPayingInput() {
        return cy.get('[data-bind="template: { name: calculationProperties.templateName, data: calculationProperties }"] > :nth-child(1) > .col-3 > .form-group > .k-widget > .k-dropdown-wrap > .k-input', {timeout : 7000})
    }
    
    // General Information / Additional Instrument Details
    
    getProducesNoticesInput() {
        return cy.get('[data-bind="template: { name: additionalDetails.templateName, data: additionalDetails }"] > :nth-child(3) > :nth-child(1) > .form-group > .k-widget > .k-dropdown-wrap > .k-input', {timeout : 7000})
    }

    // Accrual Options

    getAddAccrualOptionsBtn() {
        return cy.get('[data-scroll="accrualoptions"] > header > .k2-btn-inline')
    }

    getAddAccrualOptionsPanel() {
        return cy.get(".k2-card-row")
    }

    getAccStartDateInput() {
        return cy.get('[data-bind="kendoK2DatePicker: bindings.effectiveDate"]')
    }

    getAccEndDateInput() {
        return cy.get('[data-bind="kendoK2DatePicker: bindings.endDateExclusive"]')
    }

    getAccPrincBehaviorInput() {
        return cy.get("#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > section:nth-child(3) > div > div > div > div > div:nth-child(1) > div:nth-child(5) > fieldset > span > span > input")
    }

    getAccRateTypeInput() {
        return cy.get("#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > section:nth-child(3) > div > div > div > div > div:nth-child(1) > div:nth-child(6) > fieldset > span > span > input")
    }
/*
    getAccSpreadInput() {
        return cy.get("#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > section:nth-child(3) > div > div > div > div > div:nth-child(3) > div:nth-child(1) > fieldset > span > span > input.k-formatted-value.k2-numeric.k-widget.k-input")
    }
*/
    getAccRateInput() {
        //return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > section:nth-child(3) > div > div > div > div > div:nth-child(3) > div:nth-child(1) > fieldset > span > span > input.k-formatted-value.k2-numeric.k-widget.k-input', {timeout : 5000},{force : true})
        //return cy.get("#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > section:nth-child(3) > div > div > div > div > div:nth-child(3) > div:nth-child(1) > fieldset > span > span")
        return cy.get('#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > section:nth-child(3) > div > div > div > div > div:nth-child(3) > div:nth-child(1) > fieldset > span > span > input.k-formatted-value.k2-numeric.k-widget.k-input')
    }

    getAccInterestPayTypeInput() {
        return cy.get("#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > section:nth-child(3) > div > div > div > div > div:nth-child(3) > div:nth-child(4) > fieldset > span > span > input")
    }

    getAccPayFrequencyInput() {
        return cy.get("#workbench > div.k2-content.k2-active > div:nth-child(2) > section > div > div > div > div > div > section:nth-child(3) > div > div > div > div > div:nth-child(3) > div:nth-child(6) > fieldset:nth-child(2) > span > span > input")
    }

    getAccDayCountInput() {
        return cy.get(':nth-child(8) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
    }
	
	getAccBaseIndexInput() {
		return cy.get('.k2-card-row > :nth-child(3) > :nth-child(2) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}

	getAccIntPayTypeInput() {
		return cy.get(':nth-child(3) > :nth-child(4) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}
	
	getAccDateAdjInput() {
		return cy.get(':nth-child(13) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}
	
	getAccCashDueMethodInput() {
		return cy.get(':nth-child(14) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}
	
	getAccCashDateAsjInput() {
		return cy.get(':nth-child(16) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}
	
	getAccBaseBusDaysOffsetInput() {
		return cy.get('[data-bind="visible: !isLiborReplacement()"] > .form-group > .k-numerictextbox > .k-numeric-wrap > .k-formatted-value')
	}
	
	getAccInterestOnReductionInput() {
		return cy.get(':nth-child(18) > .form-group > .k-widget > .k-dropdown-wrap > .k-input')
	}

    // Other fields

    getInstrumentSaveBtn() {
        return cy.get(".k2-btn-primary.k2-entity-save")
    }

    getInstrumentIDfield() {
        return cy.get(':nth-child(2) > :nth-child(1) > .col-3 > .form-group > .k-textbox',{timeout : 10000})
    }

    getAddBuyTradeBtn() {
        return cy.get('#workbench > div.k2-content.k2-active > aside > div.k2-workspace-actions > div > nav:nth-child(1) > ul > li:nth-child(1) > a',{timeout : 10000})
    }

    getAddSettleTradeBtn() {
        return cy.get("#workbench nav:nth-of-type(1) [data-ap='Settle Trade']")
    }

}

export default Instrument