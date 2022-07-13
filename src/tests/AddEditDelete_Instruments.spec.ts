import HomeSteps from "@uiSteps/crm/HomeSteps";
import { test } from "@base-test";
import { expect } from '@playwright/test';
import Allure from "@allure";
import ExcelUtil from "@utils/ExcelUtil";
import HomePage from "@uiSteps/ia/HomeSteps";
import ReportingMethodsSteps from "@uiSteps/ia/ReportingMethodsSteps";
import { ldata } from "../resources/data/data";
import { APIRequestContext } from "@playwright/test";
import ReportingMethodsPage from "@pages/ia/ReportingMethodsPage";
import InstrumentsPage from "@pages/ia/InstrumentsPage";
import InstrumentsSteps from "@uiSteps/ia/InstrumentsSteps";
import UIActions from "@uiActions/UIActions";
import Assert from "@asserts/Assert";
import AlertActions from "@uiActions/AlertActions";
 
const SHEET = "AddEditDelete_ReportingMethods";

let homeSteps: HomeSteps;
let homePage: HomePage;
let reportingMethodsSteps: ReportingMethodsSteps;
let reportingMethodsPage: ReportingMethodsPage;
let instrumentsPage: InstrumentsPage;
let instrumentsSteps: InstrumentsSteps;
let ui: UIActions;
let alertActions: AlertActions;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
  })
  
  test.afterAll(async ({ browser }) => {
    // Dispose all responses.
    // await browser.dispose();
  });


test.beforeEach(async ({ page }) => {
    homeSteps = new HomeSteps(page);
    homePage = new HomePage(page);
    reportingMethodsSteps = new ReportingMethodsSteps(page);
    reportingMethodsPage = new ReportingMethodsPage;
    instrumentsPage = new InstrumentsPage;
    instrumentsSteps = new InstrumentsSteps(page);
    alertActions = new AlertActions(page);
    ui = new UIActions(page);
    await homeSteps.launchApplication("IA");
});

const data1 = ExcelUtil.getTestData(SHEET, "TC01_RM_AddEditDelete");

test(`${data1.TestID} - ${data1.Description}`, async ({page, playwright}) => {
    Allure.attachDetails(data1.Description, data1.Issue);
    
    await homePage.switchToTab("INSTRUMENTS");
    await page.waitForTimeout(3000);

    await test.step(`Checking the correctness of sorting mechanism`, async () => {
        await ui.element(InstrumentsPage.SEARCH_FIELD, "Search Field").click();
        await ui.element(InstrumentsPage.SEARCH_FIELD, "Search Field").fill("");
        await page.waitForSelector(InstrumentsPage.INSTRUMENTS_ARRAY);
        await page.waitForTimeout(5000)
        await ui.element(InstrumentsPage.NAME_COLUMN, "Name Column").click();
        await page.waitForTimeout(5000);
        await ui.element(InstrumentsPage.NAME_COLUMN, "Name Column").click();
        await page.waitForTimeout(5000);
        await ui.element(InstrumentsPage.NAME_COLUMN, "Name Column").click();
        await page.waitForTimeout(5000);
        await reportingMethodsSteps.arrayToBeInAlphabeticalOrder(InstrumentsPage.INSTRUMENTS_ARRAY, "instruments list");
    });
})