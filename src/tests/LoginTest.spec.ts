import HomeSteps from "@uiSteps/crm/HomeSteps";
 import { test } from "@base-test";
import Allure from "@allure";
import ExcelUtil from "@utils/ExcelUtil";
import { ldata } from "../resources/data/data";
 
const SHEET = "LoginTest";
let home: HomeSteps;

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
});

const data1 = ExcelUtil.getTestData(SHEET, "TC01_ValidLogin");
test(`${data1.TestID} - ${data1.Description}`, async ({page, playwright}) => {
    Allure.attachDetails(data1.Description, data1.Issue);
await page.goto('https://lpqa.allvuesystems.com/?db=354')
console.log(page.title())

 //await home.launchApplication("CRM");
    await home.login(ldata.uname,ldata.pwd);
    
     apiContext = await playwright.request.newContext();
 
   // await page.click('#hubs > a');

   // await page.goto('https://gmarigowda:Gitali_123#@https://lpqa.allvuesystems.com/?db=354')
 
});
