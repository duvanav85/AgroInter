export const environment = {
  domain : "localhost",
  commercialSupportEmail: "",
  production: false,
  apiBaseUrl: "https://localhost:44340/api",
  msalConfig: {
    auth: {
      clientId: "6af0696e-30d6-43e0-8313-a6057e7ce964"
    },
  },
  apiConfig: {
    scopes: {
      read: ["https://avtestonlineb2c.onmicrosoft.com/d0e2d22a-59dc-45cc-a4d6-53364184844e/Waivers.Read"],
      write: ["https://avtestonlineb2c.onmicrosoft.com/d0e2d22a-59dc-45cc-a4d6-53364184844e/Waivers.Write"]
    },
    uri: "https://localhost:44340/api",
  },
};
