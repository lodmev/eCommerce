import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client, UserAuthOptions } from '@commercetools/sdk-client-v2';
import {
  getAnonCtpClient,
  getAuthCtpClient,
  getCustomersCtpClient,
  getExistingTokenCtpClient,
  getReadOnlyCtpClient,
} from './clientBuilder';

const createApi = (client: Client) =>
  createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.API_CTP_PROJECT_KEY,
  });

let currentApiClient = createApi(getReadOnlyCtpClient());

const manageCustomersApiClient = createApi(getCustomersCtpClient());

const setDefaultApi = () => {
  currentApiClient = createApi(getReadOnlyCtpClient());
};

const setAuthApi = (user: UserAuthOptions) => {
  currentApiClient = createApi(getAuthCtpClient(user));
};
const setExistingTokenApi = (token: string) => {
  currentApiClient = createApi(getExistingTokenCtpClient(token));
};
const setAnonApi = () => {
  currentApiClient = createApi(getAnonCtpClient());
};

const getCurrentApiClient = () => {
  const savedToken = window.sessionStorage.getItem('token');
  if (savedToken) {
    setExistingTokenApi(savedToken);
  }
  return currentApiClient;
};
export {
  getCurrentApiClient,
  setDefaultApi,
  setAuthApi,
  setAnonApi,
  setExistingTokenApi,
  manageCustomersApiClient,
};
