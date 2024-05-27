import { IUpdateUserInfo } from '../types/interfaces';
import { getCurrentApiClient } from './apiRoot';

export const updateCustomerPersonalData = async (
  userVersion: number,
  userInfo: IUpdateUserInfo,
) => {
  // console.log('updateCustomerPersonalData');
  // console.log(userInfo);
  // console.log(userVersion);
  const { firstName } = userInfo;
  await getCurrentApiClient()
    .me()
    .post({
      body: {
        version: userVersion,
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
