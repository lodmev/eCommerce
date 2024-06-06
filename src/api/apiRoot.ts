import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client } from '@commercetools/sdk-client-v2';
import {
  // getAnonCtpClient,
  getCustomersCtpClient,
  getExistingTokenCtpClientBuilder,
  getSaveTokenCtpClientBuilder,
} from './clientBuilder';
import { getToken } from '../utils/token';
// import debug from '../utils/debug';

const createApi = (client: Client) =>
  createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.API_CTP_PROJECT_KEY,
  });

let currentApiClient = createApi(getSaveTokenCtpClientBuilder().build());

const manageCustomersApiClient = createApi(getCustomersCtpClient());

const setExistingTokenApi = (token: string) => {
  currentApiClient = createApi(getExistingTokenCtpClientBuilder(token).build());
};

const setSaveTokenApi = () => {
  currentApiClient = createApi(getSaveTokenCtpClientBuilder().build());
};

// const setFreshApiClient = () => {};

const getCurrentApiClient = () => {
  const savedToken = getToken();
  if (savedToken !== null) {
    setExistingTokenApi(savedToken);
    // debug.log('use existing token client');
  }
  return currentApiClient;
};
export { getCurrentApiClient, setExistingTokenApi, setSaveTokenApi, manageCustomersApiClient };
