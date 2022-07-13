// import HomeSteps from "@uiSteps/crm/HomeSteps";
// import HomeStepsfppm from "@uiSteps/fppm/HomeSteps";

//  import { test } from "@base-test";
// import Allure from "@allure";
// import ExcelUtil from "@utils/ExcelUtil";
// import { ldata } from "../resources/data/data";
 

// let home: HomeSteps;
// let homefppm: HomeStepsfppm;
 
// test.beforeEach(async ({ page }) => {
  
//     home = new HomeSteps(page);
//     homefppm = new HomeStepsfppm(page);

// });

// const sheet = "CreateFirm";
// const testData = ExcelUtil.getTestDataArray(sheet);
// // eslint-disable-next-line no-restricted-syntax
// for (const data of testData) {
//     test(`${data.TestID} - ${data.Description}`, async ({ page }) => {
//         Allure.attachDetails(data.Description, data.Issue);
//         const home = new HomeSteps(page);
//         await home.launchApplication("CRM");
//         await home.login(ldata.uname,ldata.pwd);
//         await home.navigateMyWorkTabFirms();
//         await home.createFirm(data.FirmName); 
//     });
// }


// test('Login to FPPM and search for Firm..', async ({ page }) => {
//     // Create 1st todo.
//     await page.waitForTimeout(4000)

//     await home.launchApplication("FPPM");
//     // await page.fill('#userNameInput', 'ALTARETURN\\gmarigowda');
//     // await page.fill('#passwordInput', 'Gitali_123#');
//     // await page.click('#submitButton');

//     // await page.waitForTimeout(10000)
//     await homefppm.searchIcon();
//     await page.waitForTimeout(4000)
//     await homefppm.searchFor("GuruTest1234")
//      await page.waitForTimeout(4000)

// })



 