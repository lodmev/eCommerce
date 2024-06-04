import { BaseAddress } from '@commercetools/platform-sdk';
import { IUpdateUserInfo } from '../types/interfaces';
import { randomUUID } from '../utils/functions';
import { manageCustomersApiClient } from './apiRoot';

export const updateCustomerPersonalData = async (
  userVersion: number,
  userId: string,
  userInfo: IUpdateUserInfo,
) => {
  const { firstName, dateOfBirth, lastName, email } = userInfo;
  const res = await manageCustomersApiClient
    .customers()
    .withId({ ID: userId })
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
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const res = await manageCustomersApiClient
    .customers()
    .password()
    .post({
      body: {
        version: userVersion,
        currentPassword,
        newPassword,
        id: userId,
      },
    })
    .execute();

  return res;
};

export const addNewAddress = async (
  userVersion: number,
  userId: string,
  address: BaseAddress,
  addressType: string,
) => {
  const key = randomUUID();
  const actionString = addressType === 'shipping' ? 'addShippingAddressId' : 'addBillingAddressId';
  const res = await manageCustomersApiClient
    .customers()
    .withId({ ID: userId })
    .post({
      body: {
        version: userVersion,
        actions: [
          {
            action: 'addAddress',
            address: {
              ...address,
              key,
            },
          },
          {
            action: actionString,
            addressKey: key,
          },
        ],
      },
    })
    .execute();

  return res;
};

export const removeAddress = async (userVersion: number, userId: string, addressId: string) => {
  const res = await manageCustomersApiClient
    .customers()
    .withId({ ID: userId })
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

export const changeAddress = async (userVersion: number, userId: string, address: BaseAddress) => {
  const res = await manageCustomersApiClient
    .customers()
    .withId({ ID: userId })
    .post({
      body: {
        version: userVersion,
        actions: [
          {
            action: 'changeAddress',
            addressId: address.id,
            address,
          },
        ],
      },
    })
    .execute();

  return res;
};

export const setDefaultShippingAndBillingAddress = async (
  userVersion: number,
  userId: string,
  addressId: string,
) => {
  const res = await manageCustomersApiClient
    .customers()
    .withId({ ID: userId })
    .post({
      body: {
        version: userVersion,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId,
          },
          {
            action: 'setDefaultBillingAddress',
            addressId,
          },
        ],
      },
    })
    .execute();

  return res;
};

export const setDefaultShippingAddress = async (
  userVersion: number,
  userId: string,
  addressId: string,
) => {
  const res = await manageCustomersApiClient
    .customers()
    .withId({ ID: userId })
    .post({
      body: {
        version: userVersion,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId,
          },
        ],
      },
    })
    .execute();

  return res;
};

export const setDefaultBillingAddress = async (
  userVersion: number,
  userId: string,
  addressId: string,
) => {
  const res = await manageCustomersApiClient
    .customers()
    .withId({ ID: userId })
    .post({
      body: {
        version: userVersion,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId,
          },
        ],
      },
    })
    .execute();

  return res;
};
