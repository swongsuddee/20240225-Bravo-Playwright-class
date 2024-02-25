import { Page, test } from "@playwright/test";

let page: Page;

// test setup
test.beforeAll(async () => {
    // open page
});

test.beforeEach(async () => {
    // prepare contract
});

// test
test.describe("Valida case", async () => {

    const customerInfo = {

    };

    const friend = {

    }

    const balances = [
        10000,
        50000,
        100000
    ]

    for (const balance of balances) {
        test(`Create contract A with balance ${balance}`, async () => {
            customerInfo
            friend
        });
    }

    test("Create contract B", async () => {
        customerInfo
        friend
    });

});

// test teardown
test.afterAll(async () => {

});