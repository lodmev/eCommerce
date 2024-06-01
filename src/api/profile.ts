import { BaseAddress } from '@commercetools/platform-sdk';
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

export const changeUserPassword = async (
  userVersion: number,
  currentPassword: string,
  newPassword: string,
) => {
  const res = await getCurrentApiClient()
    .me()
    .password()
    .post({
      body: {
        version: userVersion,
        currentPassword,
        newPassword,
      },
    })
    .execute();

  return res;
};

export const addNewAddress = async (userVersion: number, address: BaseAddress) => {
  const res = await getCurrentApiClient()
    .me()
    .post({
      body: {
        version: userVersion,
        actions: [
          {
            action: 'addAddress',
            address,
          },
        ],
      },
    })
    .execute();

  return res;
};

export const removeAddress = async (userVersion: number, addressId: string) => {
  const res = await getCurrentApiClient()
    .me()
    .post({
      body: {
        version: userVersion,
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
      },
    })
    .execute();

  return res;
};
