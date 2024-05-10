import {
  ClientBuilder,
  MiddlewareRequest,
  MiddlewareResponse,
  Next,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

function afterEx(/* options?: GenericOmit<AfterExecutionMiddlewareOptions, 'middleware'> */) {
  return (next: Next): Next =>
    (req: MiddlewareRequest, res: MiddlewareResponse) => {
      const token = req.headers?.Authorization;
      // console.log(token);
      if (token !== 'Bearer *******') {
        // console.log('yes');
      }
      next(req, res);
    };
}
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
  .withHttpMiddleware(httpMiddlewareOptions)
  .withAfterExecutionMiddleware({
    name: 'after-middleware-fn',
    middleware: afterEx,
  });
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
