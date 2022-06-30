import test, { Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import Assert from "@asserts/Assert";
//import CommonConstants from "@uiConstants/fppm/CommonConstants";
import HomePageConstants from "@uiConstants/fppm/HomePageConstants";
import HomePage from "@pages/fppm/HomePage";
import UIElementActions from "@uiActions/UIElementActions";
 
export default class HomeSteps {    
    private ui: UIActions;
    private uiElement: UIElementActions;


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

    // can add login methods later....

    /**
     
     *
     *  
     */
     public async searchIcon() {
        await test.step(`To click on search icon }`, async () => {
            await this.ui.element(HomePage.SEARCH_BUTTON,HomePageConstants.SEARCH_ICON).click();
        });        
    }
  

     public async searchFor(data:string) {
        await test.step(`To click on search icon }`, async () => {
            await this.ui.editBox(HomePage.SEARCH_TEXT,HomePageConstants.SEARCH_Txt_BOX).fill(data);
        });        
    }
}
