import { Page, expect, test } from "@playwright/test";
import path from "path";

test('Open browser and go to demoqa.com should navigate to correct website', async ({ page }) =>
    await goToWebsite(page, 'https://demoqa.com/')
);

test('Open browser and go to google.com should navigate to correct website', async ({ page }) =>
    await goToWebsite(page, 'https://www.google.com/')
);

async function goToWebsite(page: Page, webUrl: string) {
    // Arrange
    // const webUrl = 'https://demoqa.com/';

    // Action
    await page.goto(webUrl);

    // Assert
    const currentUrl = page.url();
    expect(currentUrl).toBe(webUrl);
}

test('Click me', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/buttons');
    const clickMeButtonLocator = page.locator('xpath=//button[text()="Click Me"]');

    // Action
    await clickMeButtonLocator.click();

    // Assert
    const clickMeMessage = await page.locator('css=#dynamicClickMessage');
    await expect(clickMeMessage).toHaveText('You have done a dynamic click');

    const message = await clickMeMessage.innerText();
    expect(message).toEqual('You have done a dynamic click');
});

test('Double click', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/buttons');
    const doubleClickButton = page.locator('id=doubleClickBtn');

    // Action
    await doubleClickButton.dblclick();

    // Assert
    const message = page.locator('id=doubleClickMessage');
    await expect(message).toHaveText('You have done a double click');
});

test('Right click', async ({ page }) => {
    // Arrange 
    await page.goto('https://demoqa.com/buttons');
    const rightClickButton = page.locator('id=rightClickBtn');

    // Action
    await rightClickButton.click({ button: 'right' });

    // Assert
    const message = page.locator('id=rightClickMessage');
    await expect(message).toHaveText('You have done a right click');
});

test('Fill text', async ({ page }) => {
    // Arrange 
    await page.goto('https://demoqa.com/text-box');
    const textField = page.locator('id=userName');

    // Action
    await textField.fill('Jojoe');
    // await page.locator('id=userName').fill('Jojoe');

    // Assert 
    const value = await textField.inputValue();
    expect(value).toEqual('Jojoe');

    const submitButton = page.locator('css=button#submit');
    await submitButton.click();

    const result = page.locator('id=name');
    await expect(result).toHaveText(/Jojoe/);
});

test('Invalid email format', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/text-box');
    const emailField = page.locator('id=userEmail');

    // Action
    await emailField.fill('xxx');

    // Assert
    const submitButton = page.locator('id=submit');
    await submitButton.click();

    await expect(emailField).toHaveClass(/field-error/);
});

test('Valid email format', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/text-box');
    const emailField = page.locator('css=input#userEmail');

    // Action
    await emailField.fill('xxx@domain.com');

    // Assert
    const submitButton = page.locator('css=button#submit');
    await submitButton.click();

    await expect(emailField).not.toHaveClass(/field-error/);
});

test('Fill multi-lines', async ({ page }) => {
    // Assert 
    await page.goto('https://demoqa.com/text-box');
    page.locator('css=textarea#currentAddress');
    const currentAddress = page.locator('xpath=//*[@placeHolder="Current Address"]');

    // Action
    await currentAddress.fill('123/456 My Home\nsomewhere');

    // Assert
    const submitButton = page.locator('css=button#submit');
    await submitButton.click();

    // const message = await page.locator('xpath=//*[contains(text(), "Current Address :")]').innerText();
    const message = await page.locator('css=p#currentAddress').innerText();
    expect(message).toContain('Current Address :123/456 My Home somewhere');

    /*
    <p id="currentAddress" class="mb-1">
        Current Address :123/456 My Home somewhere        <--- inner text
    </p>
    */
});

test('Keyboard', async ({ page }) => {
    // Arrange
    await page.goto('https://google.com');
    const textarea = page.locator('//textarea[@title]');

    // Action
    await textarea.press('H');
    await textarea.press('!');
    await textarea.press('Backspace');
    // await textarea.press('Enter');

    await page.mouse.click(10, 10);
    await page.locator('xpath=(//input[@value="ค้นหาด้วย Google"])[2]').click();

    // Assert
    await expect(page).toHaveURL(/\/search\?q=H/);
});

test('Checkbox uncheck option1 and check option2', async ({ page }) => {
    // Arrange
    await page.goto('https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php');

    const option1 = page.locator('xpath=//label >> text="Option 1" >> xpath=//input[@type="checkbox"]');
    const option2 = page.locator('xpath=//label >> text="Option 2" >> xpath=//input[@type="checkbox"]');
    const option3 = page.locator('xpath=//label >> text="Disabled Option" >> xpath=//input[@type="checkbox"]');

    // Action
    await option1.uncheck();
    await option2.check();

    // Assert
    // validate option1
    const isOption1Checked = await option1.isChecked();
    expect(isOption1Checked).toBeFalsy();

    await expect(option1).not.toBeChecked();

    // validate option2
    await expect(option2).toBeChecked();

    // validate option3
    await expect(option3).not.toBeChecked();
});

test('Checkbox .setChecked() method', async ({ page }) => {
    // Arrange
    await page.goto('https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php');

    const option1 = page.locator('xpath=//label >> text="Option 1" >> xpath=//input[@type="checkbox"]');
    const option2 = page.locator('xpath=//label >> text="Option 2" >> xpath=//input[@type="checkbox"]');

    await option1.setChecked(false); // prepare checkbox option1 to begin with unckecked status
    await option2.setChecked(true); // prepare checkbox option2 to begin with ckecked status

    // Assert
    // validate option1
    await expect(option1).not.toBeChecked();

    // validate option2
    await expect(option2).toBeChecked();
});

test('Radio button select option2', async ({ page }) => {
    // Radio button allow you to select only one option
    // like gender selection, (*) Male ( ) Female or ( ) Undefine
    // so you unable to uncheck the option in this case

    // Arrange
    await page.goto('https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php');

    const option1 = page.locator('id=radio1');
    const option2 = page.locator('id=radio2');

    await option2.setChecked(true); // prepare radio button option2 to begin with ckecked status

    // Action
    await option1.check();

    // Assert
    // validate option1
    await expect(option1).toBeChecked();

    // validate option2
    await expect(option2).not.toBeChecked();
});

test('Toggle', async ({ page }) => {
    // Arrange
    await page.goto('https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php');

    const toggle = page.locator('css=input#mySwitch');

    // Action
    await toggle.uncheck(); // actions .check() or .uncheck() it

    // Assert
    await expect(toggle).not.toBeChecked();

    const isChecked = await toggle.isChecked();
    console.log(isChecked);
});

test('Dropdown old style : select by inner text', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/select-menu');

    const dropdownLocator = page.locator('id=oldSelectMenu');

    // Action
    await dropdownLocator.selectOption('Black');

    // Assert
    const selectedResult = await dropdownLocator.inputValue();
    console.log('selectedResult:', selectedResult);

    // short form of chain locators: 
    // id=oldSelectMenu >> xpath=//option[@value="${selectedResult}"]
    const resultText = page.locator('id=oldSelectMenu')
        .locator(`xpath=//option[@value="${selectedResult}"]`);
    await expect(resultText).toHaveText('Black');
});

test('Dropdown div style', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/select-menu');

    const dropdownLocator = page.locator('id=withOptGroup');
    await dropdownLocator.click();

    const selectLocator = page.locator('id=withOptGroup')
        .locator('css=div[class$="menu"]')
        .locator('text="Group 1, option 2"');

    // Action
    await selectLocator.click();

    // Assert
    // Get inner text then check
    const selectedResult = page.locator('css=div[class$=singleValue]');
    const resultText = await selectedResult.innerText();
    expect(resultText).toEqual('Group 1, option 2');

    // Check locator should have text
    await expect(selectedResult).toHaveText('Group 1, option 2');
});

test('Dropdown old style : select by value', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/select-menu');

    const dropdownLocator = page.locator('id=oldSelectMenu');

    // Action
    await dropdownLocator.selectOption({ value: '3' });

    // Assert
    const selectedResult = await dropdownLocator.inputValue();
    console.log('selectedResult:', selectedResult);

    // short form of chain locators: 
    // id=oldSelectMenu >> xpath=//option[@value="${selectedResult}"]
    const resultText = page.locator('id=oldSelectMenu')
        .locator(`xpath=//option[@value="${selectedResult}"]`);
    await expect(resultText).toHaveText('Yellow');
});

test('Dropdown div style : multi-select', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/select-menu');

    const dropdownLocator = page.locator('xpath=//b[text()="Multiselect drop down"]/../../div');
    await dropdownLocator.click();

    const greenOption = page.locator('css=div[class$=menu] >> text="Green"');
    const blackOption = page.locator('css=div[class$=menu] >> text="Black"');

    // Action
    await greenOption.click();
    await blackOption.click();

    // Assert
    const selectedResults = page.locator('css=div[class$=multiValue]');
    const resultTexts = await selectedResults.allInnerTexts();
    expect(resultTexts).toEqual(['Green', 'Black']);
});

test('Date picker : select date', async ({ page }) => {
    // Arrange
    await page.goto('https://www.thaiairways.com/en_TH/index.page');

    await page.locator('css=input#to').click();

    const departing = page.locator('css=input#DepartDate');
    await departing.click();

    const dapartingDate = page.locator('css=table.month1 >> xpath=//span[text()="27"]');
    const returningDate = page.locator('css=table.month2 >> xpath=//span[text()="30"]');

    // Action
    await dapartingDate.click();
    await returningDate.click();

    // Assert
    const okButton = page.locator('xpath=//button[text()="OK" or text()="ยืนยัน"]');
    await okButton.click();

    // page.locator('xpath=//input[@id="DepartDate"]')
    const selectedDepartDate = page.locator('css=input#DepartDate');
    const departDateResult = await selectedDepartDate.inputValue();
    expect(departDateResult).toEqual('27 Feb 2024');

    const selectedReturnDate = page.locator('css=input#ReturnDate');
    const returnDateResult = await selectedReturnDate.inputValue();
    expect(returnDateResult).toEqual('30 Mar 2024');
});

test('Upload file', async ({ page }) => {
    // Arrange
    await page.goto('https://demoqa.com/upload-download');

    const inputField = page.locator('id=uploadFile');

    // /Users/jojoe/Repositories/4-Bravo/20240224 -- class3/assets/P1545891.jpeg
    const imageDir = path.join(__dirname, '../assets/P1545891.jpeg');

    // Action
    await inputField.setInputFiles([imageDir]);

    // Assert
    const uploadedFilePathLocator = page.locator('css=p#uploadedFilePath');
    const uploadedFilePath = await uploadedFilePathLocator.innerText();
    expect(uploadedFilePath).toContain("P1545891.jpeg");
});

test('Download file', async ({ page, acceptDownloads }) => {
    // Arrange
    acceptDownloads = true;

    await page.goto('https://demoqa.com/upload-download');

    const downloadButton = page.locator('id=downloadButton');

    // action
    const responsePromise = page.waitForEvent('download');
    await downloadButton.click();
    const response = await responsePromise;

    // Assert
    const fileName = response.suggestedFilename();
    expect(fileName).toBe('sampleFile.jpeg');

    // Save file
    const saveDir = path.join(__dirname, '../assets', fileName);
    await response.saveAs(saveDir);
});
