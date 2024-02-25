import { Locator, Page } from "@playwright/test";

export class NavBar {

    private readonly _page: Page;
    private readonly _logo: Locator;
    private readonly _bookTab: Locator;
    private readonly _beforeYouFlyTab: Locator;

    constructor(page: Page) {
        this._page = page;
        this._logo = page.locator('css=nav >> css=div.logo');
        this._bookTab = page.locator('xpath=//nav//a[text()="BOOK"]');
        this._beforeYouFlyTab = page.locator('xpath=//nav//a[text()="BEFORE YOU FLY"]')
    }

    public async goToHomePage() {
        await this._logo.click();
    }

    public async goToBookPage() {
        await this._bookTab.click();
    }

}