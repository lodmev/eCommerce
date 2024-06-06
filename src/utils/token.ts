import { QueryParam } from '@commercetools/platform-sdk';

const storage = window.localStorage;
const TOKEN_KEY = 'token';
const USER_FLAG = 'user';

export const saveTokenIfProvided = (token?: QueryParam) => {
  if (token && typeof token === 'string' && token !== 'Bearer ********') {
    storage.setItem(TOKEN_KEY, token);
  }
};
export const getToken = () => storage.getItem(TOKEN_KEY);
export const setUserAuthorized = () => {
  storage.setItem(USER_FLAG, '');
};
export const isUserAuthorized = () => storage.getItem(USER_FLAG) !== null;
export const removeAuthData = () => {
  storage.removeItem(USER_FLAG);
  storage.removeItem(TOKEN_KEY);
};
