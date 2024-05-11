import { Customer, type MyCustomerDraft, type MyCustomerSignin } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { getCurrentApiClient, setAuthApi, setDefaultApi } from './apiRoot';
import { removeToken } from '../utils/token';

const getUserAuth = (user: { email: string; password: string }): UserAuthOptions => ({
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

export const signupUser = async (registrationData: MyCustomerDraft): Promise<Customer> => {
  setDefaultApi();
  await getCurrentApiClient().me().signup().post({ body: registrationData }).execute();
  return loginUser(registrationData);
};

export const logoutUser = () => {
  removeToken();
  setDefaultApi();
};
