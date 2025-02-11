export const environment = {
  prod: false,
  uat: false,
  dev: true,
  msalConfig: {
    auth: {
      clientId: '84f7179a-ccda-4789-9d54-b810545f3df8',
      // redirectUrl: 'https://cwsbxapp01uv:8082/',
      //  SbxApiUrl: 'https://cwsbxapp01uv:8086',
      redirectUrl: 'https://sbxapp-dev.azurewebsites.net',
      SbxApiUrl: 'https://sbxapi-dev.azurewebsites.net',
      //authority: 'https://login.microsoftonline.com/befcf223-5020-41cc-afc1-aa4b72d5a550'
      authority: 'https://login.microsoftonline.com/organizations',
    }
  },
  appInsights: {
    //instrumentationKey: 'e808002f-4815-44ec-aaad-e254e0d4fa98',
    enableAutoRouteTracking: true,
    connectionString: 'InstrumentationKey=e808002f-4815-44ec-aaad-e254e0d4fa98;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/'
  },
  buildNumber: "${Build.BuildNumber}",
  showAiqDocs: false,
  graphUserApi: 'https://userprofile-api-dev.azurewebsites.net/'
};
