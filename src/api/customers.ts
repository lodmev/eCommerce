import { Customer, type MyCustomerDraft, type MyCustomerSignin } from '@commercetools/platform-sdk';
import { getCurrentApiClient, setDefaultApi } from './apiRoot';

export const signupUser = async (registrationData: MyCustomerDraft): Promise<Customer> => {
  const response = await getCurrentApiClient()
    .me()
    .signup()
    .post({ body: registrationData })
    .execute();
  return response.body.customer;
};
export const loginUser = async (loginData: MyCustomerSignin): Promise<Customer> => {
  const response = await getCurrentApiClient().me().login().post({ body: loginData }).execute();
  return response.body.customer;
};

export const logoutUser = () => {
  setDefaultApi();
};

export const getMe = async () => getCurrentApiClient().me().get().execute();
