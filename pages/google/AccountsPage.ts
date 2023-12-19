import { Page } from '@playwright/test';
import { UserData } from '../../types/userType';
// import { UserData } from '../../data/userData';
// import { generateToken } from 'authenticator';

export class AccountsGooglePage {
    readonly activeAccount = (user: UserData) =>
        this.page.locator(
            `[data-email="${user.email}"], [data-value="${user.email}"]`
        );
    readonly emailInput = this.page.locator('[type="email"], #Email');
    private emailNextButton = this.page.locator('#identifierNext, #next');
    private passwordInput = this.page.locator(
        'input[type="password"], input#password'
    );
    private submitButton = this.page.locator('#submit, #passwordNext, #next');
    readonly allowButton = this.page.getByRole('button', { name: 'Allow' });
    private loggedImage = this.page.locator('header button img');
    private _2faInput = this.page.locator('#totpPin');
    private _2FaNextButton = this.page.locator('#totpNext, #submit');

    constructor(private page: Page) {}

    // get2FA(): string {
    //     return generateToken(process.env.GOOGLE_AUTH_TOKEN);
    // }

    // async googleLoginWith2Fa(user: UserData): Promise<void> {
    //     const { email, password } = user;

    //     await this.emailInput.fill(email);
    //     await this.emailNextButton.click();
    //     await this.passwordInput.fill(password);
    //     await this.submitButton.click();
    //     await this._2faInput.fill(this.get2FA());
    //     await this._2FaNextButton.click();
    //     await this.loggedImage.waitFor();
    // }

    async googleLogin(user: UserData): Promise<void> {
        const { email, password } = user;

        await this.emailInput.fill(email);
        await this.emailNextButton.click();
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.loggedImage.waitFor();
    }

    async googleLoginWithStorageState(user: UserData): Promise<void> {
        await this.activeAccount(user).click({ delay: 700 });
    }

    async authorizeConnector(user: UserData): Promise<void> {
        await this.googleLoginWithStorageState(user);
        await this.allowButton.click();
    }

    async authorizeLookerStudio(): Promise<void> {
        await this.allowButton.click();
    }
}
