import { QueryParam } from '@commercetools/platform-sdk';

const KEY = 'token';

export const saveTokenIfProvided = (token?: QueryParam) => {
  if (token && typeof token === 'string' && token !== 'Bearer ********') {
    window.sessionStorage.setItem(KEY, token);
    // debug.log(token);
  }
};

export const getToken = () => window.sessionStorage.getItem(KEY);

export const removeToken = () => window.sessionStorage.removeItem(KEY);
