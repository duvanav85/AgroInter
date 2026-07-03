export const environment = {
  production: true,
  commercialSupportEmail: `#{envinteragro.commercialSupportEmail}#`,
  identityMaster: '#{envinteragro.identityMaster}#',
  domain : '#{envinteragro.domain}#',
  apiBaseUrl: '#{envinteragro.apibaseurl}#',
  msalConfig: {
    auth: {
      clientId: '#{envinteragro.clientid}#',
    },
  },
  apiConfig: {
    scopes: {
      read: ['#{envinteragro.scopes.read}#'],
      write: ['#{envinteragro.scopes.write}#']
    },
    uri: '#{envinteragro.apibaseurl}#',
  },
};
