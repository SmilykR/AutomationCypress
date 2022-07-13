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
import UIActions from "@uiActions/UIActions";
import Assert from "@asserts/Assert";
import AlertActions from "@uiActions/AlertActions";
 
const SHEET = "AddEditDelete_ReportingMethods";

let homeSteps: HomeSteps;
let homePage: HomePage;
let reportingMethodsSteps: ReportingMethodsSteps;
let reportingMethodsPage: ReportingMethodsPage;
let ui: UIActions;
let alertActions: AlertActions;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
  })

test.beforeEach(async ({ page }) => {
    homeSteps = new HomeSteps(page);
    homePage = new HomePage(page);
    reportingMethodsSteps = new ReportingMethodsSteps(page);
    reportingMethodsPage = new ReportingMethodsPage;
    alertActions = new AlertActions(page);
    ui = new UIActions(page);
    await homeSteps.launchApplication("IA");
});

const data1 = ExcelUtil.getTestData(SHEET, "RM_AddEditDelete");

test(`${data1.TestID} - ${data1.Description}`, async ({page, playwright}) => {
    Allure.attachDetails(data1.Description, data1.Issue);
    
    await homePage.switchToTab("REPORTING METHODS");
    await page.waitForTimeout(3000);

    await test.step(`Going to Reporting Methods details page`, async () => {
        await ui.element(ReportingMethodsPage.ADDREPORTINGMETHOD_BUTTON, "Add Reporting Method Button").click();
    });

    await test.step(`Filling out all necessary fields`, async () => {
        await ui.element(ReportingMethodsPage.NAME_FIELD, "Name Field").fill(data1.ReportingMethodName);
        await page.waitForTimeout(3000);
        await reportingMethodsSteps.comboBoxSearchAndSelect(ReportingMethodsPage.COSTACCOUNTINGMETHOD_COMBOBOX, data1.CostAccountingMethod);
        await reportingMethodsSteps.comboBoxSearchAndSelect(ReportingMethodsPage.DATETYPE_COMBOBOX, data1.DateType);
        await ui.element(ReportingMethodsPage.SAVE_BUTTON, "Save Button").click();
    });

    await test.step(`Asserting the newly created reporting method`, async () => {
        await ui.element(ReportingMethodsPage.REMOVENAVIGATIONPANELITEMCROSS_ICON, "cross icon").click();
        await ui.element(ReportingMethodsPage.SEARCH_FIELD, "Search Field").type(data1.ReportingMethodName);
        await page.waitForTimeout(12000);
        await Assert.assertHasText(page.locator(ReportingMethodsPage.NAME_CELL), data1.ReportingMethodName, "Name cell");
        await Assert.assertHasText(page.locator(ReportingMethodsPage.COSTACCOUNTINGMETHODOLOGY_CELL), data1.CostAccountingMethod, "Cost Accounting Method cell");
        await Assert.assertHasText(page.locator(ReportingMethodsPage.DATETYPE_CELL), data1.DateType, "Date Type cell");
    });

    await test.step(`Going back to Reporting Method details and Editing results`, async () => {
        await ui.element(ReportingMethodsPage.COSTACCOUNTINGMETHODOLOGY_CELL, "Cost Accounting Methodology Cell").click();
        await ui.element(ReportingMethodsPage.VIEWDETAIL_BUTTON, "View Detail Button").click();
        await page.waitForTimeout(3000);
        
        await ui.element(ReportingMethodsPage.NAME_FIELD, "Name Field").click();
        await page.keyboard.press("Backspace");
        await ui.element(ReportingMethodsPage.NAME_FIELD, "Name Field").type(data1.EditedReportingMethodName);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(5000);
        await Assert.assertHasValue(page.locator(ReportingMethodsPage.NAME_FIELD), data1.EditedReportingMethodName, "Name Field");
    });

    await test.step(`Reseting recent changes`, async () => {
        page.on('dialog', dialog => dialog.accept());
        await ui.element(ReportingMethodsPage.RESET_BUTTON, "Reset Button").click();
        await page.waitForTimeout(5000);
        await Assert.assertHasValue(page.locator(ReportingMethodsPage.NAME_FIELD), data1.ReportingMethodName, "Name Field");
    });

    await test.step(`Editing the fields at Reporting Methods page again`, async () => {    
        await ui.element(ReportingMethodsPage.NAME_FIELD, "Name Field").click();
        await page.keyboard.press("Backspace");
        await ui.element(ReportingMethodsPage.NAME_FIELD, "Name Field").type(data1.EditedReportingMethodName);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(5000);
        await Assert.assertHasValue(page.locator(ReportingMethodsPage.NAME_FIELD), data1.EditedReportingMethodName, "Name Field");
        await ui.element(ReportingMethodsPage.SAVE_BUTTON, "Save Button").click();
        await page.waitForTimeout(5000);
        await ui.element(ReportingMethodsPage.REMOVENAVIGATIONPANELITEMCROSS_ICON, "cross icon").click();
    });

    await test.step(`Asserting the newly produced changes to the Reporting Method`, async () => {
        await ui.element(ReportingMethodsPage.SEARCH_FIELD, "Search Field").click();
        await ui.element(ReportingMethodsPage.SEARCH_FIELD, "Search Field").fill("");
        await page.keyboard.press("Backspace");
        await ui.element(ReportingMethodsPage.SEARCH_FIELD, "Search Field").type(data1.EditedReportingMethodName);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(3000)
        await Assert.assertHasText(page.locator(ReportingMethodsPage.NAME_CELL), data1.EditedReportingMethodName, "Name Cell");
    });

    await test.step(`Checking the correctness of sorting mechanism`, async () => {
        await ui.element(ReportingMethodsPage.SEARCH_FIELD, "Search Field").click();
        await ui.element(ReportingMethodsPage.SEARCH_FIELD, "Search Field").fill("");
        await page.waitForSelector(ReportingMethodsPage.REPORTINGMETHODS_ARRAY);
        await page.waitForTimeout(5000)
        await ui.element(ReportingMethodsPage.NAME_COLUMN, "Name Column").click();
        await page.waitForTimeout(5000);
        await ui.element(ReportingMethodsPage.NAME_COLUMN, "Name Column").click();
        await page.waitForTimeout(5000);
        await ui.element(ReportingMethodsPage.NAME_COLUMN, "Name Column").click();
        await page.waitForTimeout(5000);
        await reportingMethodsSteps.arrayToBeInAlphabeticalOrder(ReportingMethodsPage.REPORTINGMETHODS_ARRAY, "reporting methods list");
    });
});