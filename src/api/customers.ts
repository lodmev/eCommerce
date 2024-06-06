import { Customer, CustomerSignInResult, MyCustomerSignin } from '@commercetools/platform-sdk';
// import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { getCurrentApiClient, manageCustomersApiClient } from './apiRoot';
import { removeAuthData } from '../utils/token';
import { RegisterCustomerDraft } from '../types/types';
// import { setUpdateFlag } from './clientBuilder';
// import debug from '../utils/debug';

// const getUserAuth = (user: Pick<RegisterCustomerDraft, 'email' | 'password'>): UserAuthOptions => ({
//   username: user.email,
//   password: user.password,
// });

export const getCurrentCustomer = async () => {
  // const apiClient = getCurrentApiClient();
  // debug.log(apiClient.me().get());
  // setUpdateFlag(true);
  const response = await getCurrentApiClient().me().get().execute();
  window.localStorage.setItem('isUserLogin', '');
  const customer = response.body;
  return customer;
};
export const loginUser = async (loginData: MyCustomerSignin): Promise<CustomerSignInResult> => {
  // setSaveTokenApi(); // perhaps not need now
  const apiClient = getCurrentApiClient();
  // debug.log(apiClient.me().get().clientRequest().headers);
  const response = await apiClient
    .me()
    .login()
    .post({ body: { ...loginData } })
    .execute();
  // window.localStorage.removeItem('token');
  await apiClient.quotes();
  await getCurrentCustomer();
  return response.body;
};

export const signupUser = async (registrationData: RegisterCustomerDraft): Promise<Customer> => {
  await manageCustomersApiClient.customers().post({ body: registrationData }).execute();
  return (await loginUser(registrationData)).customer;
};

export const logoutUser = () => {
  removeAuthData();
};
