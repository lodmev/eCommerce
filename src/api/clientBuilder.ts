import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.API_CTP_AUTH_URL,
  projectKey: import.meta.env.API_CTP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.API_CTP_CLIENT_ID,
    clientSecret: import.meta.env.API_CTP_CLIENT_SECRET,
  },
  scopes: import.meta.env.API_CTP_SCOPES.split(' '),
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.API_CTP_API_URL,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(import.meta.env.API_CTP_PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  .build();

export default ctpClient;
