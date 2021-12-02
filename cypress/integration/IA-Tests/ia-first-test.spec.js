import NavPanel from "../../support/pageObjects/NavPanel"
import LegalEntity from "../../support/pageObjects/LegalEntity"
import Instrument from "../../support/pageObjects/Instrument"
import Deal from "../../support/pageObjects/Deal"
import BuyTrade from "../../support/pageObjects/BuyTrade"
import { should } from "chai"
/*
npx cypress-ntlm open
*/

describe('My First Test', () => {
  const navPanel = new NavPanel()
  const instrument = new Instrument()
  const legalEntity = new LegalEntity()
  const buyTrade = new BuyTrade()
  const deal = new Deal()
  const legalEntityName = `TN Issuer - ${Math.floor(Math.random() * 100000)}`
  const instrumentName = `TN Instrument - ${Math.floor(Math.random() * 100000)}`//"TN Instrument - 68745"//`TN Instrument - ${Math.floor(Math.random() * 100000)}` //"TN Instrument - 68786"//
  const portfolioAllocated001 = "Allvue Pinnacle"

  const settleAndAccrualDate = "5/26/2017"
  const firstPayDate = "8/31/2017"
  const maturityDate = "5/26/2037"

  // TEMP Values Start
  const tempIssuerName = "TN Issuer"
  const tempInstrumentName = "TN Instrument - 86225"
  // TEMP Values End

  before(() => {
    cy.exec('npm cache clear --force')
    cy.ntlmReset();
    cy.ntlm(Cypress.env("host"),Cypress.env("username"),Cypress.env("password"))
    cy.visit(Cypress.env("homepage"))
    cy.url().should("include","=dashboard", {timeout : 15000})
    
  })

  it.skip('Add New Legal Entity - Issuer', () => {
    navPanel.getEntitiesItem().click()
    navPanel.getLegalEntitiesItem().click()
    cy.url().should("include","=legalEntities")
    cy.get('.k2-grid').should("include.text","View") // Legal Entities grid

    legalEntity.getAddLegalEntityBtn().click()
    cy.url().should("include","=legalEntity")
    cy.get(".k2-legalEntity").should("include.text","General Information")

    legalEntity.getLegalEntityNameInput().clear().type(legalEntityName)
    legalEntity.getLegalEntityRolesSelect().type("Issuer of Debt", {delay : 50})
    //wrap around the combo-box
    cy.get('[data-role="popup"]', {timeout : 7000}).contains("Issuer of Debt")
      .then(option => {
        cy.wrap(option).contains("Issuer of Debt");
        option[0].click()
    })
    .should("include.text","Issuer of Debt")

    legalEntity.getLegalEntityShortNameInput().clear().type(legalEntityName)
    legalEntity.geLegalEntitySaveBtn().click()
    legalEntity.getLegalEntityIDfield()
    .invoke("val").should("not.be.empty")
    .then(legalEntityID => cy.log(`Legal Entity ID is -> ${legalEntityID}`))

  })

  it.skip('Add New Deal', () => {
    navPanel.getEntitiesItem().click()
    navPanel.getDealsItem().click({force : true})
    cy.url().should("include","=deals")
    deal.getAddDealBtn().click()
    cy.url().should("include","=deal")
    
    deal.getIssuerSelect().type(legalEntityName.slice(0,6), {delay : 50})
    //wrap around the combo-box
    cy.get('[data-role="popup"]', {timeout : 7000}).contains(legalEntityName)
      .then(option => {
        cy.wrap(option).contains(legalEntityName);
        option[0].click()
    })

    deal.getCreditDateInput().type("01/01/2021{enter}")
    deal.getNotesInput()
    deal.getSaveBtn().click({force : true})
    deal.getDealIDfield()
    .invoke("val").should("not.be.empty")
    .then(dealID => cy.log(`Deal ID is -> ${dealID}`))
    deal.getDealNameInput().invoke("val").should("not.be.empty")
  })

  it('Add New Instrument - Loan - Term Loan', () => {
    navPanel.getInstrumentsItem().click()
    cy.get('[data-instance="instruments"]', {timeout: 20000})
    instrument.getAddInstrumentBtn().click()
    cy.url().should("include","=instrument")

    cy.wait(10000) // exceptionally used
    //cy.get(".k2-wait", {timeout: 10000}).should("not.exist")

    // General Information

    instrument.getInstrumentNameInput().clear().type(instrumentName)

    instrument.getIssuerInput().clear().type(tempIssuerName.slice(0, 3))
    .clear().type(tempIssuerName.slice(0, 4))
    cy.get('[data-role="popup"]', {timeout : 7000}).contains(tempIssuerName)
    .then(option => {
      cy.wrap(option).contains(tempIssuerName);
      option[0].click()
    })

    instrument.getInstrumentTypeInput().type("Loan{enter}", {delay : 50})
    .should("have.value","Loan")
    instrument.getInstrumentSubTypeInput().clear().type("Term Loan{downarrow}{downarrow}{enter}", {delay : 50})
    .should("have.value","Term Loan")
    instrument.getIssueDateInput().type(`${settleAndAccrualDate}{enter}`)
    .should("have.value",`${settleAndAccrualDate}`)
    instrument.getFirstSettleDateInput().type(`${settleAndAccrualDate}{enter}`)
    .should("have.value",`${settleAndAccrualDate}`)
    instrument.getInterestAccrualDateInput().type(`${settleAndAccrualDate}{enter}`)
    .should("have.value",`${settleAndAccrualDate}`)
    instrument.getFirstPaymentDateInput().type(`${firstPayDate}{enter}`)
    .should("have.value",`${firstPayDate}`)
    instrument.getMaturityDateInput().type(`${maturityDate}{enter}`)
    .should("have.value",`${maturityDate}`)
    instrument.getOriginalIssuePriceInput().click({force : true}).type("100")
    instrument.getOriginalGlobalAmountInput().click({force : true}).type("50m")
    instrument.getCurrencyInput().type("US{downarrow}{enter}", {delay : 50})
    .should("have.value","USD")

    // General Information / Calculation Properties

    instrument.getPriceFactorInput().type("{downarrow}{enter}", {delay : 50})
    .should("have.value","Par Based")
    instrument.getTradesWAccrualInterestInput().type("{downarrow}{enter}", {delay : 50})
    .should("have.value","Yes")
    instrument.getEOMPayingInput().type("{downarrow}{enter}", {delay : 50})
    .should("have.value","Yes")

    // General Information / Additional Instrument Details

    instrument.getProducesNoticesInput().clear().type("Y{downarrow}{enter}", {delay : 50})
    .should("have.value","Yes")

    // Accrual Options
    instrument.getAddAccrualOptionsBtn().click({force : true})
    instrument.getAddAccrualOptionsPanel()
    instrument.getAccStartDateInput()
    .should("have.value",`${settleAndAccrualDate}`)
    instrument.getAccEndDateInput()
    .should("have.value",`${maturityDate}`)
    instrument.getAccPrincBehaviorInput().clear().type("Fu{downarrow}{enter}", {delay : 50})
    .should("have.value","Funded")
    instrument.getAccRateTypeInput().clear().type("Fix{downarrow}{backspace}{enter}", {delay : 60})
    .should("have.value","Fixed")
    instrument.getAccInterestPayTypeInput().clear().type("{downarrow}{downarrow}{enter}", {delay : 50})
    .should("have.value","Cash")
    instrument.getAccPayFrequencyInput().clear().type("{downarrow}{downarrow}{enter}", {delay : 50})
    .should("have.value","Semi-Annual")
    instrument.getAccDayCountInput().clear().type("30/{downarrow}{enter}", {delay : 50})
    .should("have.value","30/360")
    instrument.getAccDateAdjInput().clear().type("{downarrow}{downarrow}{enter}", {delay : 50})
    .should("have.value","Next Business Day Unless In Next Month")
    instrument.getAccCashDateAsjInput().clear().type("{downarrow}{downarrow}{enter}", {delay : 50})
    .should("have.value","Next Business Day Unless In Next Month")
    instrument.getAccCashDueMethodInput().clear().type("{downarrow}{enter}", {delay : 50})
    .should("have.value","On Accrual End")
    instrument.getAccInterestOnReductionInput().clear().type("Y{downarrow}{enter}", {delay : 50})
    .should("have.value","Yes")

    instrument.getAccRateInput().type("5", {delay : 50})

    cy.get('.col-6 > .form-group > .k-textbox').click()

    instrument.getAccRateInput().should("have.value","5.00000 %")

    instrument.getInstrumentSaveBtn().click() // Save buttton

    cy.wait(6000) // Exceptionally used

    instrument.getInstrumentIDfield() // InstrumentID field
    .invoke("val").should("not.be.empty")
    .then(instrumentID => cy.log(`instrument ID is -> ${instrumentID}`))
   
    })

  it('Add new Buy Trade', () => {

    // Open Instruments list window, filter the one previously created
    // and then open details
    cy.visit(Cypress.env("homepage")+"?_=instruments")
    cy.url().should("include","=instruments")
    instrument.getInstrumentsSearchBar()
    .should('exist').and("be.ok").clear()
    .type(instrumentName+"{enter}", {delay : 30})

    // When filtered out, then open Instrument details window
    cy.get("[data-instance='instruments'] > .k-grid-content [role='rowgroup']", {timeout : 35000}) // tbody
    .should('exist').and("be.ok")
    .find(`[id="columnLink${instrumentName}"]`, {timeout : 35000})
    .should('exist').and("be.ok")
    .click({force : true})

    instrument.getInstrumentNameInput()
    .should("have.value", instrumentName, {timeout : 35000})

     instrument.getInstrumentIDfield() // InstrumentID field
    .invoke("val").should("not.be.empty", {timeout : 35000})
    .then(instrumentID => cy.log(`instrument ID is -> ${instrumentID}`))

    // Click [Buy Trade] from Instrument Details window
    instrument.getAddBuyTradeBtn().click()

    cy.url().should("include","newTradeType=Buy")

    // Instrument Selection
    cy.get('form', {timeout : 35000}).should('exist').and("be.ok")
    buyTrade.getBuyTradeIssuerInput()
    .should("have.value",tempIssuerName, {timeout : 7000})
    buyTrade.getBuyTradeInstrumentTypeInput()
    .should("have.value","Loan")
    buyTrade.getBuyTradeInstrumentSubTypeInput()
    .should("have.value","Term Loan")
    buyTrade.getBuyTradeInstrumentInput()
    .should("have.value",instrumentName, {timeout : 7000})

    buyTrade.getBuyTradeNextBtn().click()

    // Details and Allocations
    cy.get('.k2-newtradeallocationstep > :nth-child(2) > .k2-section', {timeout : 15000}) // Trade Details grid
    .should("be.visible", {timeout : 15000})

    buyTrade.getTradeInput().clear().type(`${settleAndAccrualDate}{enter}`)
    .should("have.value",`${settleAndAccrualDate}`)
    buyTrade.getSettleDateInput().clear().type(`${settleAndAccrualDate}{enter}`)
    .clear().type(`${settleAndAccrualDate}{enter}`)
    .should("have.value",`${settleAndAccrualDate}`)
    
    buyTrade.getMarketTypeInput().clear().type('{downarrow}{downarrow}{enter}', {delay : 50})
    .should("have.value","Secondary")
    buyTrade.getTradeDocTypeInput().clear().type('{downarrow}{downarrow}{downarrow}{enter}', {delay : 50})
    .should("have.value","Other")
    buyTrade.getAgreementTypeInput().clear().type('{downarrow}{enter}', {delay : 50})
    .should("have.value","Assignment")
    

    buyTrade.getParInput().should('exist').and("be.ok").clear().click({force : true})
    cy.get('[data-bind="kendoK2NumericTextBox: bindings.par"]').should('exist').and("be.ok").clear().click().type('5000000{enter}',{force : true,delay : 50}) // works OK

    // Allocation Grid
    cy.get("[data-instance='newtradeallocations'] > .k-grid-content [role='rowgroup']", {timeout : 2000}) // tbody
    .find('[data-field="portfolioName"]') // tcell
    .contains(portfolioAllocated001)
    .click()

    // Finish Button
    cy.get('[data-ap="Finish"]', {timeout : 20000}).click()

    // Summary step
    cy.get('.k2-wizardsummarygrid > :nth-child(2) > form', {timeout : 30000})
    .should("include.text", "Complete")
    .and("include.text", portfolioAllocated001)
    .and("include.text", "Success")

    // Exit out
    cy.get('[data-ap="Exit"]', {timeout : 20000}).click()

  })

  it.skip("Settle Buy Trade", () => {
    // Open Instruments list window, filter the one previously created
    // and then open details
    cy.visit(Cypress.env("homepage")+"?_=instruments")
    cy.url().should("include","=instruments")
    instrument.getInstrumentsSearchBar()
    .should('exist').and("be.ok").clear()
    .type(instrumentName+"{enter}", {delay : 30})

    // When filtered out, then open Instrument details window
    cy.get("[data-instance='instruments'] > .k-grid-content [role='rowgroup']", {timeout : 35000}) // tbody
    .should('exist').and("be.ok")
    .find(`[id="columnLink${instrumentName}"]`, {timeout : 35000})
    .should('exist').and("be.ok")
    .click({force : true})

    instrument.getInstrumentNameInput()
    .should("have.value", instrumentName, {timeout : 35000})

     instrument.getInstrumentIDfield() // InstrumentID field
    .invoke("val").should("not.be.empty", {timeout : 35000})
    .then(instrumentID => cy.log(`instrument ID is -> ${instrumentID}`))

    instrument.getAddSettleTradeBtn().click()

    // Trade Order step
    cy.get('.k2-wizard-step-active > .nav-link', {timeout : 25000})
    .should("be.ok").and("include.text", "Trade Order")
    cy.get('[data-bind="kendoK2DatePicker: effectiveDate"]', {timeout : 25000})
    .and("be.ok")
    cy.get(".k2-row-selected-highlight").should("be.ok")
    cy.get('.k2-row-selected-highlight > [data-field="tradeDate"]', {timeout : 25000})
    .should("include.text", `${settleAndAccrualDate}`, {timeout : 25000})
    .and("be.ok")
    cy.get('.k2-row-selected-highlight > [data-field="settleDateContractual"]')
    .should("include.text", `${settleAndAccrualDate}`, {timeout : 25000})
    .and("be.ok")
    cy.get("[aria-disabled='false'][data-bind='kendoK2DatePicker: effectiveDate']")
    .should("be.ok").clear().clear().type(settleAndAccrualDate)

    cy.get("[data-ap='Next']").click()

    // Allocations step
    cy.get('.k2-row-selected-highlight > [data-field="portfolioName"]')
    .should("include.text", portfolioAllocated001)

    cy.get("[data-ap='Next']").click()

    // Accruals step
    // Assert that the table in Accruals step exists
    cy.get("[data-bind='xtmpl: bindings.componentOfAccrualsModel'] .row .k-selectable")
    .should("be.ok")
    cy.get('.k2-wizard-step-active > .nav-link', {timeout : 25000})
    .should("be.ok").and("include.text", "Accruals")
    cy.get('[data-field="accrualOption"]').should("be.ok").and("include.text", "Fixed: 5.00000%",{timeout : 25000})
    cy.get('.k-state-selected > #aria_active_cell')
    .should("be.ok", {timeout : 25000})//.click()//.type("5000000")
    cy.get('.k-state-selected > [data-field="nextPaymentDate"]').should("be.ok", {timeout : 25000})//.click()//.type(firstPayDate)

  })

})