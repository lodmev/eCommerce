import {
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  MiddlewareRequest,
  MiddlewareResponse,
  Next,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { saveTokenIfProvided } from '../utils/token';
import debug from '../utils/debug';

let needUpdateAuth = false;

export const setUpdateFlag = (status: boolean) => {
  needUpdateAuth = status;
};

function afterEx(/* options?: GenericOmit<AfterExecutionMiddlewareOptions, 'middleware'> */) {
  return (next: Next): Next =>
    (req: MiddlewareRequest, res: MiddlewareResponse) => {
      const token = req.headers?.Authorization;
      // debug.log(req);
      saveTokenIfProvided(token);
      next(req, res);
    };
}
function beforeEx(/* options?: GenericOmit<AfterExecutionMiddlewareOptions, 'middleware'> */) {
  return (next: Next): Next =>
    (req: MiddlewareRequest, res: MiddlewareResponse) => {
      const token = req.headers?.Authorization;
      if (req.headers?.Authorization && needUpdateAuth) {
        req.headers.Authorization = '';
      }
      debug.log(token);
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

const baseCtpClient = new ClientBuilder()
  .withProjectKey(import.meta.env.API_CTP_PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withBeforeExecutionMiddleware({ middleware: beforeEx });
// .withLoggerMiddleware()

const getAnonCtpClientBuilder = () => baseCtpClient.withAnonymousSessionFlow(authMiddlewareOptions);

const getExistingTokenCtpClientBuilder = (token: string) => {
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  return getSaveTokenCtpClientBuilder().withExistingTokenFlow(token, options);
};

const getSaveTokenCtpClientBuilder = () =>
  getAnonCtpClientBuilder().withAfterExecutionMiddleware({
    name: 'after-middleware-fn',
    middleware: afterEx,
  });

const getCustomersCtpClient = () =>
  new ClientBuilder()
    .withProjectKey(import.meta.env.API_CTP_PROJECT_KEY)
    .withClientCredentialsFlow(manageCustomersMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();

export { getSaveTokenCtpClientBuilder, getExistingTokenCtpClientBuilder, getCustomersCtpClient };
