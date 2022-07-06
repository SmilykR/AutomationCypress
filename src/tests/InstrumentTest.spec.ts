import HomeSteps from "@uiSteps/crm/HomeSteps";
 import { test } from "@base-test";
import Allure from "@allure";
import ExcelUtil from "@utils/ExcelUtil";
import HomePage from "@uiSteps/ia/HomeSteps";
import { ldata } from "../resources/data/data";
import { APIRequestContext } from "@playwright/test";
import InstrumentPage from "@pages/ia/InstrumentPage";
 
const SHEET = "LoginTest";
let home: HomeSteps;
let homeIA:HomePage;

let apiContext;

test.beforeAll(async ({ playwright }) => { 
    apiContext = await playwright.request.newContext();
  })
  
  test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
  });


test.beforeEach(async ({ page }) => {
    home = new HomeSteps(page);
    homeIA = new HomePage(page);
});

const data1 = ExcelUtil.getTestData(SHEET, "TC01_ValidLogin");
test(`${data1.TestID} - ${data1.Description}`, async ({page, playwright}) => {
    Allure.attachDetails(data1.Description, data1.Issue);
   // console.log("title is ---"+page.title());  
    await home.launchApplication("IA");
    await page.waitForTimeout(5000);
    await homeIA.switchToTab("INSTRUMENT");
    await page.waitForTimeout(3000);   
 
});
