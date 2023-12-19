import { datasourceDeploymentId } from "../config/dataConfig";
import { Datasource } from "../types/datasourceType";
import { isProd } from "./url";


export const datasources: Datasource[] = [{
        title: 'Google Analytics',
        dataSourceId: 'GA',
        deploymentId: isProd() ? 'AKfycbyllvaK7y-1Ee1blueI92A7OLkY69Aymnm57HzN9w65LPLcQrsjpis1' : datasourceDeploymentId.GA,
        accounts: ['Acc1', 'Acc2'],
        auth: 'Google'
},
{
        title: 'Google Analytics 4',
        dataSourceId: 'GAWA',
        deploymentId: isProd() ? 'AKfycbyllvaK7y-1Ee1blueI92A7OLkY69Aymnm57HzN9w65LPLcQrsjpis1' : datasourceDeploymentId.GAWA,
        accounts: ['Acc1', 'Acc2'],
        auth: 'Google'
}]

