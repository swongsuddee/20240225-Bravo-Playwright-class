import { Locator, Page } from "@playwright/test";
import { NavBar } from "./nav-bar";

export class HomePage {

    public navbarComponent: NavBar;

    private readonly _popularFareDealsRow: Locator;
    private readonly _nextButton: Locator;
    private readonly _prevButton: Locator;

    constructor(page: Page) {
        this.navbarComponent = new NavBar(page);
        this._popularFareDealsRow = page.locator('css=div.rec-carousel-item');
        this._nextButton = page.getByTestId('carousellBtnNext');
        this._prevButton = page.getByTestId('carousellBtnPrevious');

    }

    public async getRowCount() {
        const count = await this._popularFareDealsRow.count();
        return count;
    }

    public async selectPopularFareDealsByIndex(index: number) {
        const count = await this.getRowCount();
        
    }

}