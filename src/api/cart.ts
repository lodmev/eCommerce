import { isUseAnon, isUserAuthorized } from '../utils/token';
import { getCurrentApiClient, setAnonApi } from './apiRoot';

export const createCart = async () => {
  const resp = await getCurrentApiClient()
    .me()
    .carts()
    .post({ body: { currency: 'EUR' } })
    .execute();
  return resp.body;
};
export const addToCart = () => {};
export const getActiveCart = async () => {
  if (!isUserAuthorized() && !isUseAnon()) {
    setAnonApi();
    return createCart();
  }
  try {
    const resp = await getCurrentApiClient().me().activeCart().get().execute();
    return resp.body;
  } catch (e) {
    if (e instanceof Object && 'statusCode' in e) {
      if (e.statusCode === 403) {
        setAnonApi();
        return createCart();
      }
      if (e.statusCode === 404) return createCart();
    }
    throw e;
  }
};
