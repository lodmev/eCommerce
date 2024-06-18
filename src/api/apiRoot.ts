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
import { getToken, isUseAnon, isUserAuthorized, resetAuth, setUseAnon } from '../utils/token';
// import debug from '../utils/debug';

const createApi = (client: Client) =>
  createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.API_CTP_PROJECT_KEY,
  });

let currentApiClient: ByProjectKeyRequestBuilder = createApi(getReadOnlyCtpClient());

const manageCustomersApiClient = createApi(getCustomersCtpClient());

const setDefaultApi = () => {
  resetAuth();
  currentApiClient = createApi(getReadOnlyCtpClient());
};

const setAuthApi = (user: UserAuthOptions) => {
  resetAuth();
  currentApiClient = createApi(getAuthCtpClient(user));
};

const setAnonApi = () => {
  resetAuth();
  currentApiClient = createApi(getAnonCtpClient());
  setUseAnon();
};

const getAuthOrAnonApi = () => {
  if (tokenError.isBroken) {
    setAnonApi();
    tokenError.isBroken = false;
  } else if (!isUserAuthorized() && !isUseAnon()) {
    setAnonApi();
  }
  return getCurrentApiClient();
};

const getCurrentApiClient = () => {
  if (tokenError.isBroken) {
    setDefaultApi();
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
