import { test } from "@playwright/test";

test.describe.configure({
    mode: 'serial',
});

test('test 1', async () => {

});

test('test 2', async () => {
    test.fail();
});

test('test 3', async () => {

});

test('test 4', async () => {

});