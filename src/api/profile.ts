import { IUpdateUserInfo } from '../types/interfaces';
import { getCurrentApiClient } from './apiRoot';

export const updateCustomerPersonalData = async (
  userVersion: number,
  userInfo: IUpdateUserInfo,
) => {
  const { firstName, dateOfBirth, lastName, email } = userInfo;
  const res = await getCurrentApiClient()
    .me()
    .post({
      body: {
        version: userVersion,
        actions: [
          {
            action: 'setFirstName',
            firstName,
          },
          {
            action: 'setLastName',
            lastName,
          },
          {
            action: 'changeEmail',
            email,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
        ],
      },
    })
    .execute();

  return res;
};

export const changePassword = () => {};
