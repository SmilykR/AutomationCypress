import test, { expect, Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import Assert from "@asserts/Assert";
import CommonConstants from "@uiConstants/crm/CommonConstants";
import InstrumentsPage from "@pages/ia/InstrumentsPage";


export default class InstrumentsSteps {    
    private ui: UIActions;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    public async arrayToBeInAlphabeticalOrder(locator: string, description: string, softAssert = false, alphabetically: boolean = true) {
        await test.step(`Verifying that ${description} is ordered alphabetically`, async () => {               
            try {
                let second_index: number;
                let array: any;
                array =  await this.page.locator(locator).allInnerTexts()
                //const count = await this.page.locator(locator).count();
                //await console.log(count);
                await console.log(array);
                for(let first_index = 0; first_index < array.length; first_index++) {
                    second_index = first_index + 1;
                    console.log(array[second_index]);
                    console.log(array[first_index]);
                    console.log(array[second_index].localeCompare(array[first_index]));
                    if (array[second_index].localeCompare(array[first_index], undefined, { numeric: true }) >= 0){
                        alphabetically = true}
                    else{
                        alphabetically = false}
                expect(alphabetically, `Expected is 'true' & Actual is '${alphabetically}'`).toEqual(true);
            }} catch (error) {
                if (alphabetically == false) {
                    throw new Error(error);
                }
            }
        })
    }
}