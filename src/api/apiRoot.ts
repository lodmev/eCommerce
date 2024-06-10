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
  tokenError,
} from './clientBuilder';
import {
  getToken,
  isUseAnon,
  isUserAuthorized,
  resetAuth,
  setUseAnon,
  unSetUseAnon,
} from '../utils/token';
// import debug from '../utils/debug';

const createApi = (client: Client) =>
  createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.API_CTP_PROJECT_KEY,
  });

let currentApiClient: ByProjectKeyRequestBuilder = createApi(getReadOnlyCtpClient());

const manageCustomersApiClient = createApi(getCustomersCtpClient());

const setDefaultApi = () => {
  currentApiClient = createApi(getReadOnlyCtpClient());
  resetAuth();
};

const setAuthApi = (user: UserAuthOptions) => {
  currentApiClient = createApi(getAuthCtpClient(user));
  unSetUseAnon();
};

const setAnonApi = () => {
  resetAuth();
  currentApiClient = createApi(getAnonCtpClient());
  setUseAnon();
};

const getAuthOrAnonApi = () => {
  if (!isUserAuthorized() && !isUseAnon()) {
    setAnonApi();
  }
  return getCurrentApiClient();
};

const getCurrentApiClient = () => {
  if (tokenError.isBroken) {
    resetAuth();
    currentApiClient = createApi(getReadOnlyCtpClient());
    tokenError.isBroken = false;
  }
  const savedToken = getToken();
  if (savedToken) {
    currentApiClient = createApi(getExistingTokenCtpClient(savedToken));
  }
  return currentApiClient;
};
export {
  getCurrentApiClient,
  setDefaultApi,
  setAuthApi,
  setAnonApi,
  getAuthOrAnonApi,
  manageCustomersApiClient,
};
