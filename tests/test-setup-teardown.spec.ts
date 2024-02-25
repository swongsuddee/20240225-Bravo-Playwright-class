import { Page, expect, test } from "@playwright/test";

let page: Page;

// test setup
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://demoqa.com/webtables');
});

test.beforeEach(async () => {
    // open contract 
});

const employeeList = [
    {
        firstName: "Jojoe",
        lastName: "Bravo",
        age: 29,
        email: "jojoe@bravo.com",
        salary: 1000000,
        department: "qa"
    }, {
        firstName: "Jeng",
        lastName: "Bravo",
        age: 99,
        email: "jeng@bravo.com",
        salary: 1000000,
        department: "qa"
    }
];

// test
for (const newEmployee of employeeList) {
    test(`Add employee ${newEmployee.email} infos`, async () => {
        const addButton = page.locator('id=addNewRecordButton');
        const firstNameInput = page.locator('id=firstName');
        const lastNameInput = page.locator('id=lastName');
        const emailInput = page.locator('id=userEmail');
        const ageInput = page.locator('id=age');
        const salaryInput = page.locator('id=salary');
        const departmentInput = page.locator('id=department');
        const submitButton = page.locator('id=submit');

        // Action
        await addButton.click();
        await firstNameInput.fill(newEmployee.firstName);
        await lastNameInput.fill(newEmployee.lastName);
        await ageInput.fill(String(newEmployee.age));
        await emailInput.fill(newEmployee.email);
        await salaryInput.fill(String(newEmployee.salary));
        await departmentInput.fill(newEmployee.department);
        await submitButton.click();

        // Assert
        const newEmployeeRow = page.locator(`xpath=//div[@class="rt-tbody"]`)
            .locator(`//div[@role="row" and not(contains(@class, "padRow"))]`)
            .locator(`//div[text()="${newEmployee.email}"]/../div`);

        const newEmployeeInfo = {
            firstName: await newEmployeeRow.nth(0).innerText(),
            lastName: await newEmployeeRow.nth(1).innerText(),
            age: Number(await newEmployeeRow.nth(2).innerText()),
            email: await newEmployeeRow.nth(3).innerText(),
            salary: Number(await newEmployeeRow.nth(4).innerText()),
            department: await newEmployeeRow.nth(5).innerText()
        }
        expect(newEmployeeInfo).toEqual(newEmployee);
    });
}

// test teardown
test.afterAll(async () => {
    await page.close();
});