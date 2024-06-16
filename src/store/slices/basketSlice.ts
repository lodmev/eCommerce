import { Cart, LineItem, ProductProjection } from '@commercetools/platform-sdk';
import { buildCreateSlice, asyncThunkCreator, SerializedError } from '@reduxjs/toolkit';
import {
  addToCart,
  applyDiscountCode,
  changeQuantity,
  deleteCart,
  getActiveCart,
  removeFromCart,
} from '../../api/cart';

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
type BasketState = {
  productsInBasket: ProductProjection[];
  productIdToQuantity: Record<string, number>;
  pending: boolean;
  fulfilled: boolean;
  err?: SerializedError;
  cartData?: Cart;
};

const initialBasketState: BasketState = {
  productsInBasket: [],
  productIdToQuantity: {},
  pending: false,
  fulfilled: false,
};

export function calculateTotalPrice(priceValue: number, quantity: number): number {
  return priceValue * quantity;
}

const basketSlice = createAppSlice({
  name: 'basketData',
  initialState: initialBasketState,
  reducers: (create) => ({
    removeProductQuantity: create.asyncThunk(
      async (product: LineItem, thunkApi) => {
        const state = thunkApi.getState() as { basketData: BasketState };
        const cart = state.basketData.cartData!;
        return removeFromCart({ cart, product });
      },
      {
        pending: (state) => {
          state.err = undefined;
          state.pending = true;
        },
        rejected: (state, action) => {
          state.err = action.error;
        },
        fulfilled: (state, action) => {
          state.cartData = action.payload;
          delete state.productIdToQuantity[action.meta.arg.productId];
        },
        settled: (state) => {
          state.pending = false;
        },
      },
    ),
    addProduct: create.asyncThunk(
      async (product: ProductProjection, thunkApi) => {
        const state = thunkApi.getState() as { basketData: BasketState };
        if (state.basketData.cartData) {
          const cart = state.basketData.cartData;
          return addToCart({ cart, product });
        }
        return getActiveCart([{ productId: product.id, variantId: product.masterVariant.id }]);
      },
      {
        pending: (state) => {
          state.err = undefined;
          state.pending = true;
        },
        rejected: (state, action) => {
          state.err = action.error;
        },
        fulfilled: (state, action) => {
          state.cartData = action.payload;
          state.productIdToQuantity[action.meta.arg.id] = 1;
        },
        settled: (state) => {
          state.pending = false;
        },
      },
    ),
    fetchCartData: create.asyncThunk(getActiveCart, {
      pending: (state) => {
        state.err = undefined;
        state.pending = true;
      },
      rejected: (state, action) => {
        state.err = action.error;
      },
      fulfilled: (state, action) => {
        state.cartData = action.payload;
        action.payload.lineItems.forEach((lineItem) => {
          state.productIdToQuantity[lineItem.productId] = lineItem.quantity;
        });
      },
      settled: (state) => {
        state.pending = false;
      },
    }),
    applyPromoCode: create.asyncThunk(
      async (promoCode: string, thunkApi) => {
        const state = thunkApi.getState() as { basketData: BasketState };
        const cart = state.basketData.cartData!;
        return applyDiscountCode({ cart, promoCode });
      },
      {
        pending: (state) => {
          state.err = undefined;
          state.pending = true;
        },
        rejected: (state, action) => {
          state.err = action.error;
        },
        fulfilled: (state, action) => {
          state.cartData = action.payload;
          action.payload.lineItems.forEach((lineItem) => {
            state.productIdToQuantity[lineItem.productId] = lineItem.quantity;
          });
        },
        settled: (state) => {
          state.pending = false;
        },
      },
    ),
    resetCartState: create.reducer<undefined>((state) => {
      state.cartData = undefined;
      state.productIdToQuantity = {};
    }),
    deleteCartThunk: create.asyncThunk(
      async (_, thunkApi) => {
        const state = thunkApi.getState() as { basketData: BasketState };
        const cart = state.basketData.cartData!;
        return deleteCart(cart);
      },
      {
        pending: (state) => {
          state.err = undefined;
          state.pending = true;
        },
        rejected: (state, action) => {
          if (
            action.payload instanceof Object &&
            'responseCode' in action.payload &&
            action.payload.responseCode === 404
          ) {
            state.cartData = undefined;
            state.productIdToQuantity = {};
          }
          state.err = action.error;
        },
        fulfilled: (state) => {
          state.cartData = undefined;
          state.productIdToQuantity = {};
        },
        settled: (state) => {
          state.pending = false;
        },
      },
    ),
    setProductQuantity: create.asyncThunk(
      async ({ product, quantity }: { product: LineItem; quantity: number }, thunkApi) => {
        const state = thunkApi.getState() as { basketData: BasketState };
        const cart = state.basketData.cartData!;
        return changeQuantity({ cart, product, quantity });
      },
      {
        pending: (state) => {
          state.err = undefined;
          state.pending = true;
        },
        rejected: (state, action) => {
          state.err = action.error;
        },
        fulfilled: (state, action) => {
          state.cartData = action.payload;
          const productId = action.meta.arg.product.id;
          const updatedQuantityItem = action.payload?.lineItems.find(
            ({ id }: LineItem) => id === productId,
          );
          state.productIdToQuantity[productId] =
            updatedQuantityItem?.quantity || action.meta.arg.quantity;
        },
        settled: (state) => {
          state.pending = false;
        },
      },
    ),
  }),
});
export default basketSlice;
export const {
  setProductQuantity,
  removeProductQuantity,
  addProduct,
  fetchCartData,
  resetCartState,
  deleteCartThunk,
  applyPromoCode,
} = basketSlice.actions;
