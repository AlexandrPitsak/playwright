import { Page } from '@playwright/test';
import { Datasource } from '../types/datasourceType';

export class AuthorizationForm {
    readonly gaAuthForm = this.page.locator('.authorize.column').last();
    readonly authorizeConnectorButton = this.gaAuthForm.locator('.md-accent');

    lsAuthorizeButton = this.page
        .locator('.authorize')
        .filter({
            has: this.page.locator('.authorization-message'),
            hasText: 'Looker Studio',
        })
        .getByText('Authorize');

    connectorAuthorizeButton = (datasources: Datasource) =>
        this.page
            .locator('.authorize')
            .filter({
                has: this.page.locator('.authorization-message'),
                hasText: datasources.title,
            })
            .getByText('Authorize');

    constructor(private page: Page) {}

    async clickAuthorizeConnectorButton(): Promise<Page> {
        await this.waitForLoad();
        const context = this.page.context();
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.authorizeConnectorButton.click(),
        ]);
        await newPage.waitForLoadState();

        return newPage;
    }

    async waitForLoad() {
        const spinner = await this.page.$('.progress-container');
        if (spinner) {
            await spinner.waitForElementState('hidden');
        }
    }

    async clickAuthorizeLookerStudioButton(): Promise<Page> {
        await this.waitForLoad();
        const context = this.page.context();
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.lsAuthorizeButton.click(),
        ]);
        await newPage.waitForLoadState();

        return newPage;
    }
}
