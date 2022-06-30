import test, { Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import Assert from "@asserts/Assert";
import CommonConstants from "@uiConstants/crm/CommonConstants";
import HomePageConstants from "@uiConstants/crm/HomePageConstants";
import HomePage from "@pages/crm/HomePage";

export default class HomeSteps {    
    private ui: UIActions;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }
    /**
     * Launch the Application
     */
    public async launchApplication(url: string) {
        if(url == "CRM"){
        await test.step(`Launching the application`, async () => {
            await this.ui.goto(process.env.BASE_URL);
        });
    } else if (url == "FPPM"){
        await test.step(`Launching the application`, async () => {
            await this.ui.goto(process.env.BASE_FPPM_URL);
        });
    }
    }
    /**
     * Log into the application
     * @param userName 
     * @param password 
     */
    public async login(userName: string, password: string) {
        await test.step(`Login to application credentials as ${userName} & ${password}`, async () => {
           // await this.ui.element(HomePage.USER_ICON, HomePageConstants.USER_ICON).click();
            await this.enterLoginDetails(userName, password);
        });        
    }
    /**
     * Enter login details
     * @param userName 
     * @param password 
     */
    public async enterLoginDetails(userName: string, password: string) {
        await test.step(`Enter login credentials as ${userName} & ${password}`, async () => {

            await this.ui.editBox("#userNameInput", HomePageConstants.USER_NAME).fill(userName);
            await this.ui.editBox("#passwordInput", HomePageConstants.PASSWORD).fill(password);
          //  await this.ui.checkbox(HomePage.REMEMBER_ME_CHECKBOX, HomePageConstants.REMEMBER_ME_CHECKBOX).check();
            await this.ui.element("#submitButton", HomePageConstants.SIGN_IN_BUTTON).click();
    
        //     await this.ui.editBox(HomePage.USER_NAME_TEXTBOX, HomePageConstants.USER_NAME).fill(userName);
        //     await this.ui.editBox(HomePage.PASSWORD_TEXTBOX, HomePageConstants.PASSWORD).fill(password);
        //   //  await this.ui.checkbox(HomePage.REMEMBER_ME_CHECKBOX, HomePageConstants.REMEMBER_ME_CHECKBOX).check();
        //     await this.ui.element(HomePage.SIGN_IN_BUTTON, HomePageConstants.SIGN_IN_BUTTON).click();
        });
    }
    /**
     * Validate logged in user
     * @param userName 
     */
    public async validateLogin(userName: string) {
        await test.step(`Verify that user is successfully logged in as ${userName}`, async () => {
            const user = await this.ui.element(HomePage.LOGGED_IN_USER, HomePageConstants.USER_NAME).getTextContent();
            await Assert.assertEquals(user, userName, HomePageConstants.USER_NAME);
        });        
    }
    /**
     * Validate invalid login
     * @param errorMessage 
     */
    public async validateInvalidLogin(errorMessage: string) {
        await test.step(`Verify that error message ${errorMessage}`, async () => {
            const user = await this.ui.element(HomePage.SIGN_IN_ERROR_MESSAGE, HomePageConstants.SIGN_IN_ERROR_MESSAGE)
                .getTextContent();
            await Assert.assertEquals(user, errorMessage, HomePageConstants.SIGN_IN_ERROR_MESSAGE);
        });
    }
    /**
     * Log out of the application
     */
    public async logout() {
        await test.step(`Logged out of application`, async () => {
            await this.ui.element(HomePage.LOGGED_IN_USER, HomePageConstants.USER_NAME).click();
            await this.ui.element(HomePage.SIGN_OUT_LINK, HomePageConstants.SIGN_OUT_LINK).click();
            await this.ui.pauseInSecs(CommonConstants.TWO);
        });
    }
  
 
     

    /** navigate to my work tab FIRMS  */
    public async navigateMyWorkTabFirms() {
        await test.step(`Navtigate to my work tab drop down and click on FIRMS`, async () => {
            await (await this.ui.element(HomePage.NAV_BAR, HomePageConstants.NAV_BAR).waitForPresent()).click();
            await this.ui.element(HomePage.MYWORK_FIRMS, HomePageConstants.MYWORK_FIRMS).click();

        });
    }

    // switch to frame 
    public async switchToFrame(selector : String, selector1 : String, selector2 : String, data:String) {
        await test.step(`Switch to iFrame..`, async () => {
            this.ui.pauseInSecs(5000);
            // await (await this.ui.element(HomePage.NAV_BAR, HomePageConstants.NAV_BAR).waitForPresent()).click();
            // await this.ui.element(HomePage.MYWORK_FIRMS, HomePageConstants.MYWORK_FIRMS).click();
            console.log(`${selector}`);
            const frame=  this.page.frame({name :`${selector}`});
            if (frame != null){
              const frames = frame.childFrames();
              console.log(frames.length)
             // const frame1 = page.frame({name : "contentIFrame1"});
             if (frames != null)
             {
              
              console.log("Found frame I am in....")
              this.ui.pauseInSecs(10000);
              console.log(`${selector2}`);
              await this.page.frameLocator(`${selector1}`)
                .locator(`${selector2}`).fill(`${data}`,{ timeout: 20000 });
            
             }else{
               console.log("Frame not found....")
             }
            
            
            }else throw new Error("no such frame")
        });
    }
    /** click on new button  */
    public async createFirm(data:string) {
        await test.step(`Firms screen - > to create new Record`, async () => {
 
            await (await this.ui.element(HomePage.MYWORK_FIRMS_NEW_BTN, HomePageConstants.MYWORK_FIRMS_NEW_BTN).waitForPresent()).click(); 
            this.switchToFrame("contentIFrame0","#contentIFrame1","#name_i",data)
            await (await this.ui.element(HomePage.FIRMS_SAVE_CLOSE, HomePageConstants.MYWORK_FIRMS_NEW_BTN).waitForPresent()).click(); 
 
        });
    }
}