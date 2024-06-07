import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { buildCreateSlice, asyncThunkCreator, SerializedError } from '@reduxjs/toolkit';
import { addToCart, getActiveCart } from '../../api/cart';

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
    addProductToBasket: create.reducer<ProductProjection>((state, action) => {
      const { id } = action.payload;
      if (!(id in state.productIdToQuantity)) return;
      state.productsInBasket.push(action.payload);
      state.productIdToQuantity[action.payload.id] = 1;
    }),
    removeProductQuantity: create.reducer<string>((state, action) => {
      state.productsInBasket = state.productsInBasket.filter(
        ({ id }: ProductProjection) => id !== action.payload,
      );
      delete state.productIdToQuantity[action.payload];
    }),
    setProductQuantity: create.reducer<{ id: string; quantity: number }>((state, action) => {
      state.productIdToQuantity[action.payload.id] = action.payload.quantity;
    }),
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
    resetCartState: create.reducer<undefined>((state) => {
      state.cartData = undefined;
      state.productIdToQuantity = {};
    }),
  }),
});
export default basketSlice;
export const {
  addProductToBasket,
  setProductQuantity,
  removeProductQuantity,
  addProduct,
  fetchCartData,
  resetCartState,
} = basketSlice.actions;
