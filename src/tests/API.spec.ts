import HomeSteps from "@uiSteps/crm/HomeSteps";
import { test } from "@base-test";
import { expect, request } from '@playwright/test';
import Allure from "@allure";
import ExcelUtil from "@utils/ExcelUtil";
import HomePage from "@uiSteps/ia/HomeSteps";
import ReportingMethodsSteps from "@uiSteps/ia/ReportingMethodsSteps";
import { ldata } from "../resources/data/data";
import { APIRequestContext } from "@playwright/test";
import ReportingMethodsPage from "@pages/ia/ReportingMethodsPage";
import UIActions from "@uiActions/UIActions";
import Assert from "@asserts/Assert";
 
const SHEET = "AddEditDelete_ReportingMethods";

let homeSteps: HomeSteps;
let homePage: HomePage;
let reportingMethodsSteps: ReportingMethodsSteps;
let reportingMethodsPage: ReportingMethodsPage;
let ui: UIActions;

const createReportingMethodRequestBody1 = {
    name: "reportingMethodName1",
    costAccountingMethodology: "FIFO",
    capLotsFirst: false,
    dateType: "SettleDate",
    reportingSchedule: {
      days: [],
    },
    events: {},
  };

test.beforeAll(async ({browser, page, playwright}) => {
    const context = await request.newContext({
        httpCredentials: {
          username: '***',
          password: '***',
        },
      });
      await page.goto('http://caaq-iareg-k1/k2?_=dashboard');
  })

test.beforeEach(async ({ page }) => {
    homeSteps = new HomeSteps(page);
    homePage = new HomePage(page);
    reportingMethodsSteps = new ReportingMethodsSteps(page);
    reportingMethodsPage = new ReportingMethodsPage;
    ui = new UIActions(page);
    //await homeSteps.launchApplication("IA");
});

const data1 = ExcelUtil.getTestData(SHEET, "TC01_RM_AddEditDelete");

test(`${data1.TestID} - ${data1.Description}`, async ({page, playwright, request}) => {
    Allure.attachDetails(data1.Description, data1.Issue);
    
    await homePage.switchToTab("REPORTING METHODS");
    await page.waitForTimeout(3000);

    await test.step(`Going to Reporting Methods details page`, async () => {
        await ui.element(ReportingMethodsPage.ADDREPORTINGMETHOD_BUTTON, "Add Reporting Method Button").click();
    });

    await test.step(`Sending API request`, async () => {

        const reportingMethodResponseBody1 = await request.post("http://caaq-iareg-k1/k2/api/reportingMethod/save", 
        {
            data : createReportingMethodRequestBody1
        })

        await console.log(createReportingMethodRequestBody1)

        await console.log(JSON.parse(JSON.stringify(reportingMethodResponseBody1)))
        await expect(reportingMethodResponseBody1.ok()).toBeTruthy();
        await expect (await reportingMethodResponseBody1.json()).toContainEqual(expect.objectContaining({
            name: "reportingMethodName1",
        }));
    });
})