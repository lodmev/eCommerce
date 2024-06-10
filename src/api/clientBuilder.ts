import {
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  MiddlewareRequest,
  MiddlewareResponse,
  Next,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { saveTokenIfProvided, resetAuth } from '../utils/token';
// import  debug from '../utils/debug'

function afterEx(/* options?: GenericOmit<AfterExecutionMiddlewareOptions, 'middleware'> */) {
  return (next: Next): Next =>
    (req: MiddlewareRequest, res: MiddlewareResponse) => {
      const token = req.headers?.Authorization;
      saveTokenIfProvided(token);
      if (res.error && res.error.message === 'invalid_token') {
        resetAuth();
      }
      // debug.log(res)
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

const manageCustomersMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.API_CTP_AUTH_URL,
  projectKey: import.meta.env.API_CTP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.API_CUSTOMERS_CTP_CLIENT_ID,
    clientSecret: import.meta.env.API_CUSTOMERS_CTP_CLIENT_SECRET,
  },
  scopes: import.meta.env.API_CUSTOMERS_CTP_SCOPES.split(' '),
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.API_CTP_API_URL,
  fetch,
};

const baseCtpClient = () =>
  new ClientBuilder()
    .withProjectKey(import.meta.env.API_CTP_PROJECT_KEY)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // line below always save token
    .withAfterExecutionMiddleware({
      name: 'after-middleware-fn',
      middleware: afterEx,
    });
// .withLoggerMiddleware()

const getReadOnlyCtpClient = () => baseCtpClient().build();

const getAnonCtpClient = () =>
  baseCtpClient().withAnonymousSessionFlow(authMiddlewareOptions).build();

const getExistingTokenCtpClient = (token: string) => {
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  return baseCtpClient().withExistingTokenFlow(token, options).build();
};

const getAuthCtpClient = (user: UserAuthOptions) => {
  const passOptions: PasswordAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    credentials: { ...authMiddlewareOptions.credentials, user },
  };
  return (
    baseCtpClient()
      // .withAfterExecutionMiddleware({
      //   name: 'after-middleware-fn',
      //   middleware: afterEx,
      // })
      .withPasswordFlow(passOptions)
      .build()
  );
};

const getCustomersCtpClient = () =>
  new ClientBuilder()
    .withProjectKey(import.meta.env.API_CTP_PROJECT_KEY)
    .withClientCredentialsFlow(manageCustomersMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();

export {
  getReadOnlyCtpClient,
  getAnonCtpClient,
  getAuthCtpClient,
  getExistingTokenCtpClient,
  getCustomersCtpClient,
};
