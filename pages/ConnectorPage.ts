import { Locator, Page } from '@playwright/test';
import { AuthorizationForm } from './AuthoriztionForm';


export class ConnectorPage {
    authorizationForm: AuthorizationForm = new AuthorizationForm(this.page);
    // configuration: ConfigPage = new ConfigPage(this.page);
    connectButton: Locator = this.page.locator('.embedded-header button', {
        hasText: 'CONNECT',
    });

    connectorTitle = (title: string): Locator =>
        this.page.getByRole('link', { name: title });

    constructor(private page: Page) {}
}
