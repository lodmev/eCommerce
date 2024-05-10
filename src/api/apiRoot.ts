import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { getAnonCtpClient, getAuthCtpClient, getReadOnlyCtpClient } from './clientBuilder';

const createApi = (client: Client) =>
  createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.API_CTP_PROJECT_KEY,
  });

let currentApiClient = createApi(getReadOnlyCtpClient());

const getCurrentApiClient = () => currentApiClient;

const setDefaultApi = () => {
  currentApiClient = createApi(getReadOnlyCtpClient());
};

const setAuthApi = (user: UserAuthOptions) => {
  currentApiClient = createApi(getAuthCtpClient(user));
};

const setAnonApi = () => {
  currentApiClient = createApi(getAnonCtpClient());
};
export { getCurrentApiClient, setDefaultApi, setAuthApi, setAnonApi };
