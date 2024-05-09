import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './clientBuilder';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.API_CTP_PROJECT_KEY,
});

export default apiRoot;
