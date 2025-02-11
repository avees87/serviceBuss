// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageInfo from '../../package.json';

export const environment = {
    prod: false,
    uat: false,
    dev: false,
    msalConfig: {
        auth: {
            clientId: '84f7179a-ccda-4789-9d54-b810545f3df8',
            redirectUrl: 'http://localhost:4200/',
            //redirectUrl: 'https://cwsbxapp01uv:8082/',
            // SbxApiUrl: 'https://sbxapi-uat.azurewebsites.net',
            SbxApiUrl: 'https://localhost:7018',
            //authority: 'https://login.microsoftonline.com/befcf223-5020-41cc-afc1-aa4b72d5a550'
            authority: 'https://login.microsoftonline.com/organizations',
        }
    },
    appInsights: {
        //instrumentationKey: 'e808002f-4815-44ec-aaad-e254e0d4fa98',
        enableAutoRouteTracking: true,
        //connectionString: 'InstrumentationKey=e808002f-4815-44ec-aaad-e254e0d4fa98;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/'
        //disable it for local debugging
        connectionString: 'InstrumentationKey=00000000;IngestionEndpoint=https://.azure.com/;LiveEndpoint=https://azure.com/'
    },
    VERSION: packageInfo.version,
    appVersion: require('../../package.json').version + ' Local',
    buildNumber: "${Build.BuildNumber}",
    showAiqDocs: false,
    graphUserApi: 'https://userprofile-api-dev.azurewebsites.net/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
