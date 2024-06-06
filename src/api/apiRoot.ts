import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { Client, UserAuthOptions } from '@commercetools/sdk-client-v2';
import {
  getAnonCtpClient,
  getAuthCtpClient,
  getCustomersCtpClient,
  getExistingTokenCtpClient,
  getReadOnlyCtpClient,
} from './clientBuilder';
import { getToken, resetAuth, setUseAnon, unSetUseAnon } from '../utils/token';
// import debug from '../utils/debug';

const createApi = (client: Client) =>
  createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.API_CTP_PROJECT_KEY,
  });

let currentApiClient: ByProjectKeyRequestBuilder;

const manageCustomersApiClient = createApi(getCustomersCtpClient());

const setDefaultApi = () => {
  currentApiClient = createApi(getReadOnlyCtpClient());
  resetAuth();
  unSetUseAnon();
};

setDefaultApi();

const setAuthApi = (user: UserAuthOptions) => {
  currentApiClient = createApi(getAuthCtpClient(user));
  unSetUseAnon();
};

const setAnonApi = () => {
  currentApiClient = createApi(getAnonCtpClient());
  setUseAnon();
};

const getCurrentApiClient = () => {
  const savedToken = getToken();
  if (savedToken) {
    currentApiClient = createApi(getExistingTokenCtpClient(savedToken));
  }
  return currentApiClient;
};
export { getCurrentApiClient, setDefaultApi, setAuthApi, setAnonApi, manageCustomersApiClient };
