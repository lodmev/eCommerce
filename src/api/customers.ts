import { Customer, type MyCustomerDraft, type MyCustomerSignin } from '@commercetools/platform-sdk';
import apiRoot from './apiRoot';

export const signupUser = async (registrationData: MyCustomerDraft): Promise<Customer> => {
  const response = await apiRoot.me().signup().post({ body: registrationData }).execute();
  return response.body.customer;
};
export const loginUser = async (loginData: MyCustomerSignin): Promise<Customer> => {
  const response = await apiRoot.me().login().post({ body: loginData }).execute();
  return response.body.customer;
};
// feat: add commerce tools sdk library and nessarry dependencies
