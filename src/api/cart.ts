import { getCurrentApiClient } from './apiRoot';

export const createCart = () => {};
export const addToCart = () => {};
export const getCart = async () => {
  try {
    const resp = await getCurrentApiClient().me().activeCart().get().execute();
    return resp.body;
  } catch (e) {
    if (e instanceof Object && 'statusCode' in e) {
      return getNewCart();
    }
    throw e;
  }
};
export const getNewCart = async () => {
  const resp = await getCurrentApiClient()
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute();
  return resp.body;
};
