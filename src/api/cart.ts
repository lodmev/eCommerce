import { Cart, LineItem, MyLineItemDraft, ProductProjection } from '@commercetools/platform-sdk';
import { isUseAnon, isUserAuthorized } from '../utils/token';
import { getAuthOrAnonApi, setAnonApi } from './apiRoot';

export const createCart = async (lineItems?: MyLineItemDraft[]) => {
  const apiClient = getAuthOrAnonApi();
  const resp = await apiClient
    .me()
    .carts()
    .post({ body: { currency: 'EUR', lineItems } })
    .execute();
  return resp.body;
};
export const addToCart = async ({ cart, product }: { cart: Cart; product: ProductProjection }) => {
  const apiClient = getAuthOrAnonApi();
  const resp = await apiClient
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'addLineItem',
            productId: product.id,
            variantId: product.masterVariant.id,
          },
        ],
      },
    })
    .execute();
  return resp.body;
};
export const getActiveCart = async (lineItems?: MyLineItemDraft[]) => {
  if (!isUserAuthorized() && !isUseAnon()) return createCart(lineItems);
  const apiClient = getAuthOrAnonApi();
  try {
    const resp = await apiClient.me().activeCart().get().execute();
    return resp.body;
  } catch (e) {
    if (e instanceof Object && 'statusCode' in e) {
      if (e.statusCode === 403) {
        setAnonApi();
        return createCart(lineItems);
      }
      if (e.statusCode === 404) return createCart(lineItems);
    }
    throw e;
  }
};

export const changeQuantity = async ({
  cart,
  product,
  quantity,
}: {
  cart: Cart;
  product: LineItem;
  quantity: number;
}) => {
  const apiClient = getAuthOrAnonApi();
  const resp = await apiClient
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: product.id,
            quantity,
          },
        ],
      },
    })
    .execute();
  return resp.body;
};
