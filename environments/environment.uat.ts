export const environment = {
  prod: false,
  uat: true,
  dev: false,
  msalConfig: {
    auth: {
        clientId: '84f7179a-ccda-4789-9d54-b810545f3df8',
        // redirectUrl: 'https://cwsbxapp01uv:8082/',
        //  SbxApiUrl: 'https://cwsbxapp01uv:8086',
        redirectUrl: 'https://sbxapp-uat.azurewebsites.net',
        SbxApiUrl: 'https://sbxapi-uat.azurewebsites.net',
        //authority: 'https://login.microsoftonline.com/befcf223-5020-41cc-afc1-aa4b72d5a550'
        authority: 'https://login.microsoftonline.com/organizations',
    }
  },
  appInsights: {
    connectionString: 'InstrumentationKey=1bfec168-02e4-49d8-81bc-bd035be35241;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/',
    enableAutoRouteTracking: true
  },
  buildNumber: "${Build.BuildNumber}",
  showAiqDocs: false,
  graphUserApi: 'https://userprofile-api-uat.azurewebsites.net/'
};
