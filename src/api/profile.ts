import { IUpdateUserInfo } from '../types/interfaces';
import { getCurrentApiClient } from './apiRoot';

export const updateCustomerPersonalData = async (userInfo: IUpdateUserInfo) => {
  // console.log('updateCustomerPersonalData');
  // console.log(userInfo);
  const { firstName } = userInfo;
  await getCurrentApiClient()
    .me()
    .post({
      body: {
        version: 2,
        actions: [
          {
            action: 'setFirstName',
            firstName,
          },
        ],
      },
    })
    .execute();
  // console.log(res);
};

export const changePassword = () => {};
