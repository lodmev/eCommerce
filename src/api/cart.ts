import { getCurrentApiClient } from './apiRoot';

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
  try {
    const resp = await getCurrentApiClient().me().activeCart().get().execute();
    return resp.body;
  } catch (e) {
    if (e instanceof Object && 'statusCode' in e) {
      return createCart();
    }
    throw e;
  }
};
