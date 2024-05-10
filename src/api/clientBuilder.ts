import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
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

const baseCtpClient = new ClientBuilder()
  .withProjectKey(import.meta.env.API_CTP_PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions);
// .withLoggerMiddleware()

const getReadOnlyCtpClient = () => baseCtpClient.build();

const getAnonCtpClient = () =>
  baseCtpClient.withAnonymousSessionFlow(authMiddlewareOptions).build();

const getAuthCtpClient = (user: UserAuthOptions) => {
  const passOptions: PasswordAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    credentials: { ...authMiddlewareOptions.credentials, user },
  };
  return baseCtpClient.withPasswordFlow(passOptions).build();
};

export { getReadOnlyCtpClient, getAnonCtpClient, getAuthCtpClient };
