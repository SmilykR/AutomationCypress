import test, { expect, Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import Assert from "@asserts/Assert";
import CommonConstants from "@uiConstants/crm/CommonConstants";
import InstrumentsPage from "@pages/ia/InstrumentsPage";
import PositionPage from "@pages/ia/PositionsPage";
import AgentPage from "@pages/ia/AgentAdministrationPage";
import DataMigrationPage from "@pages/ia/DataMigrationPage";
import EntityPage from "@pages/ia/EntitiesPage";
import PricingPage from "@pages/ia/PricingPage";
import ReportPage from "@pages/ia/Reportspage";
import TradesPage from "@pages/ia/TradesPage";
import UserActivityPage from "@pages/ia/UserActivityPage";
import ReportingMethodsPage from "@pages/ia/ReportingMethodsPage";


export default class HomeSteps {    
    private ui: UIActions;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }
    
    public async switchToTab(tab : String) {
        await test.step(`Switching to tab in the home page `, async () => {

            switch(tab.toUpperCase()){
                case "INSTRUMENTS":
                    await this.ui.element(InstrumentsPage.INSTRUMENTS_TAB,"Instrument Tab").click();
                    // let value =  await this.ui.getText(InstrumentsPage.PAGE_TITLE);
                    // expect(value).toContain("Instruments");
                    break;
                case "POSITIONS":
                    await this.ui.element(PositionPage.POSITIONS_TAB,"Positions Tab").click();
                    break;
                case "TRADES":
                    await this.ui.element(TradesPage.TRADES_TAB,"Trades Tab").click();
                    break;
                case "USER ACTIVITY":
                    await this.ui.element(UserActivityPage.USERACTIVITY_TAB,"UserActivity Tab").click();
                    break;
                case "REPORTS":
                    await this.ui.element(ReportPage.REPORTS_TAB,"Reports Tab").click();
                    break;
                case "DATA MIGRATION":
                    await this.ui.element(DataMigrationPage.DATAMIGRATION_TAB,"DataMigration Tab").click();
                    break;
                case "AGENT ADMINISTRATION":
                    await this.ui.element(AgentPage.AGENTADMINISTRATION_TAB,"Agent Administration Tab").click();
                    break;
                case "PRICING":
                    await this.ui.element(PricingPage.PRICING_TAB,"Pricing Tab").click();
                    break;
                case "ENTITIES":
                    await this.ui.element(EntityPage.ENTITIES_TAB,"Entities Tab").click();
                    break;
                case "REPORTING METHODS":
                    await this.ui.element(EntityPage.ENTITIES_TAB,"Entities Tab").click();
                    await this.ui.element(ReportingMethodsPage.REPORTINGMETHODS_TAB,"Reporting Methods Tab").click();
                    break;
                default:
                    break;

            }     
            await this.ui.pauseInSecs(CommonConstants.TWO);       
        });
    }   
    
}