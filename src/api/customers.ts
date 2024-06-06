import { Customer, MyCustomerSignin } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import {
  getCurrentApiClient,
  manageCustomersApiClient,
  setAuthApi,
  setDefaultApi,
} from './apiRoot';
import { removeToken } from '../utils/token';
import { RegisterCustomerDraft } from '../types/types';

const getUserAuth = (user: Pick<RegisterCustomerDraft, 'email' | 'password'>): UserAuthOptions => ({
  username: user.email,
  password: user.password,
});
export const getCurrentCustomer = async () => {
  const response = await getCurrentApiClient().me().get().execute();
  const customer = response.body;
  return customer;
};
export const loginUser = async (loginData: MyCustomerSignin): Promise<Customer> => {
  setAuthApi(getUserAuth(loginData));
  return getCurrentCustomer();
};

export const signupUser = async (registrationData: RegisterCustomerDraft): Promise<Customer> => {
  setDefaultApi();
  await manageCustomersApiClient.customers().post({ body: registrationData }).execute();
  return loginUser(registrationData);
};

export const logoutUser = () => {
  removeToken();
  setDefaultApi();
};
