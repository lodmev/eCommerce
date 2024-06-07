import { QueryParam } from '@commercetools/platform-sdk';

const storage = window.localStorage;
const KEY = 'token';
const USER_FLAG = 'user';
const ANON_FLAG = 'useAnon';

export const saveTokenIfProvided = (token?: QueryParam) => {
  if (token && typeof token === 'string' && token !== 'Bearer ********') {
    storage.setItem(KEY, token);
    // debug.log(token);
  }
};
export const getToken = () => storage.getItem(KEY);

export const isUserAuthorized = () => storage.getItem(USER_FLAG) !== null;

export const removeToken = () => storage.removeItem(KEY);

export const setUseAnon = () => storage.setItem(ANON_FLAG, '1');

export const unSetUseAnon = () => storage.removeItem(ANON_FLAG);

export const isUseAnon = () => storage.getItem(ANON_FLAG) !== null;

export const setUserLogin = () => storage.setItem(USER_FLAG, '1');

export const setUserLogout = () => storage.removeItem(USER_FLAG);

export const resetAuth = () => {
  removeToken();
  setUserLogout();
};
