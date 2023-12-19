// type BaseDataSource = {
//     dataSourceId: string;
//     title: string,
//     name: string;
// };

// type GADataSource = BaseDataSource & {
//     dataSourceId: 'GA';
// };

export type  Datasource = {
    title: string;
    dataSourceId: string;
    deploymentId: string;
    accounts: string[];
    auth: string;
}

// enum EDatasources {
//     GA =  'Google Analytics',
//     GA4 = 'Google Analytics 4',
// }

// export type DataSource = GADataSource
