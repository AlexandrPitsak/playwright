import { test, expect, Page, BrowserContext } from '@playwright/test';
import { UserData } from '../types/userType';
import { isProd, urls } from '../data/url';
import { TEST_USER_2 } from '../data/user';
import { AccountsGooglePage } from '../pages/google/AccountsPage';
import { navigateToConnectorPage } from '../helpers/navigate';
import { datasources } from '../data/datasource';
import { ConnectorPage } from '../pages/ConnectorPage';
import { Datasource } from '../types/datasourceType';



export async function revokeAccess({datasource,page,} : {datasource: Datasource; page: Page;}) {
  const isProduction = isProd();
  const title = datasource.title;
  const cardText = `${title} By Supermetrics #1`;
  const removalText = `${title} was removed`;
  const removeDialog = page.locator('.apps-script-remove-dialog');

  await page.goto('/u/0/datasources/create/');
  await page.locator('.search-bar-container input').fill(title);
  await page
      .locator('.mdc-card')
      .filter({
          has: page.locator('.card-content .title-text'),
          hasText: isProduction ? cardText : `LOCAL: ${cardText}`,
      })
      .locator('.card-actions')
      .locator('.more-menu-button')
      .click();


  await page
      .locator('.mat-mdc-menu-item-text', { hasText: 'Revoke access' })
      .click();
  await removeDialog.locator('.md-raised', { hasText: 'Remove' }).click();

  if (isProduction) {
      await removeDialog
          .locator('.md-raised', { hasText: 'Remove anyway' })
          .click();
  }
  await page.locator('.md-toast-content', { hasText: removalText }).waitFor();
}

const user = TEST_USER_2

for (const datasource of datasources) {

   // @ts-ignore
    async function authorizeToGoogleAccount({user, page}: {user: UserData; page: Page;}) {
        await page.goto(urls.googleAccounts);
        const accountsGoogle = new AccountsGooglePage(page);
        await accountsGoogle.googleLogin(user);
  }

  test.describe.serial('Given user authorize to Google account', async () => {
            let browserContext: BrowserContext,
                page: Page,
                newPage: Page,
                connectorPage: ConnectorPage,
                accountsGooglePage: AccountsGooglePage;

            test.beforeAll(async ({ browser }) => {
                browserContext = await browser.newContext();
                page = await browserContext.newPage();
                
                await authorizeToGoogleAccount({ user, page });
            });

            test.afterAll(async () => {
              await revokeAccess({ datasource, page });
              await browserContext.close();
          });

              test.describe('Given user authorize to Google accounteee', async () => {
                    test.beforeAll(async () => {
                      await navigateToConnectorPage(datasource, page);

                      connectorPage = new ConnectorPage(page);
                    });
                  
                    test(`Check title for ${datasource.title}`, async function () {
                      await expect(
                          connectorPage.connectorTitle(datasource.title),
                          'Connector title is not as expected'
                      ).toBeVisible();
                    });
                    test(`Check button for ${datasource.title}`, async function () {
                      await expect(
                          connectorPage.authorizationForm.lsAuthorizeButton,
                          'Looker studio auth button is not displayed'
                      ).toBeVisible();
                    });
          
                    test(`Check button is disabled for ${datasource.title}`, async function () {
                        await expect(
                            connectorPage.authorizationForm.lsAuthorizeButton,
                            'Looker studio auth button is not enabled'
                        ).toBeEnabled();
                    });


                    test.describe('WHEN user authorize to LS', async () => {
                      test.beforeAll(async () => {
                          newPage = await connectorPage.authorizationForm.clickAuthorizeLookerStudioButton();
                          accountsGooglePage = new AccountsGooglePage(newPage);
          
                          await accountsGooglePage.authorizeLookerStudio();
                      });
          
                      test(`THEN authorize to Connector button is displayed for ${datasource.title}`, async function () {
                          await expect(
                              connectorPage.authorizationForm.connectorAuthorizeButton(datasource),
                              'Looker studio auth button is not displayed'
                          ).toBeVisible();
                      });
                
      
      
      
      
                });      
                
              });  
  });


}