import { Page } from "@playwright/test";
import { Datasource } from "../types/datasourceType";

export async function navigateToConnectorPage(datasource: Datasource, page: Page): Promise<void> {

    await page.goto(`/u/0/datasources/create?connectorId=${datasource.deploymentId}`);
}