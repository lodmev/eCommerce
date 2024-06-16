import {
  Cart,
  ClientResponse,
  LineItem,
  MyLineItemDraft,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { isUseAnon, isUserAuthorized } from '../utils/token';
import { getAuthOrAnonApi, setAnonApi } from './apiRoot';
// import debug from '../utils/debug';

export const createCart = async (lineItems?: MyLineItemDraft[]) => {
  const apiClient = getAuthOrAnonApi();
  const resp = await apiClient
    .me()
    .carts()
    .post({ body: { currency: 'EUR', lineItems } })
    .execute();
  return resp.body;
};
export const addToCart = async ({ cart, product }: { cart?: Cart; product: ProductProjection }) => {
  if (!cart && !isUserAuthorized() && !isUseAnon()) {
    return createCart([{ productId: product.id, variantId: product.masterVariant.id }]);
  }
  const apiClient = getAuthOrAnonApi();
  // debug.log('isUseAnon:', isUseAnon());
  const currentCart = cart ?? (await getActiveCart());
  const resp = await apiClient
    .me()
    .carts()
    .withId({ ID: currentCart.id })
    .post({
      body: {
        version: currentCart.version,
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
    if (!import.meta.env.DEV) {
      window.console.clear();
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

export const removeFromCart = async ({ cart, product }: { cart: Cart; product: LineItem }) => {
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
            action: 'removeLineItem',
            lineItemId: product.id,
          },
        ],
      },
    })
    .execute();
  return resp.body;
};

export const deleteCart = async (cart: Cart): Promise<ClientResponse<Cart>> => {
  const apiClient = getAuthOrAnonApi();
  const resp = await apiClient
    .me()
    .carts()
    .withId({ ID: cart.id })
    .delete({
      queryArgs: {
        version: cart.version,
      },
    })
    .execute();
  return resp;
};

export const applyDiscountCode = async ({ cart, promoCode }: { cart: Cart; promoCode: string }) => {
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
            action: 'addDiscountCode',
            code: promoCode,
          },
        ],
      },
    })
    .execute();
  return resp.body;
};
