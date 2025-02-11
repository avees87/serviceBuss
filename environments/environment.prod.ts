export const environment = {
  prod: true,
  uat: false,
  dev: false,
  msalConfig: {
    auth: {
      clientId: '84f7179a-ccda-4789-9d54-b810545f3df8',
      redirectUrl: 'https://sbx.rpm-apps.com',
      SbxApiUrl: 'https://sbxapi-prod.azurewebsites.net',
      authority: 'https://login.microsoftonline.com/organizations',
    }
  },
  appInsights: {
    connectionString: 'InstrumentationKey=07461b78-8d40-4a9d-a178-937deeccd7e1;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/',
    enableAutoRouteTracking: true
  },
  buildNumber: "${Build.BuildNumber}",
  showAiqDocs: false,
  graphUserApi: 'https://userprofile-api-prod.azurewebsites.net/'
};
