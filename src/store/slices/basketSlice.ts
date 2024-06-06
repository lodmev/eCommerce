import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
type BasketState = {
  productsInBasket: ProductProjection[];
  productIdToQuantity: Record<string, number>;
  pending: boolean;
  fulfilled: boolean;
  err: Error | null;
  cartData?: Cart;
};

const initialBasketState: BasketState = {
  productsInBasket: [],
  productIdToQuantity: {},
  pending: false,
  fulfilled: false,
  err: null,
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
      if (state.productsInBasket.find((product) => product.id === id)) {
        return;
      }
      state.productsInBasket = [...state.productsInBasket, action.payload];
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
    setCartData: create.reducer<Cart>((state, action) => {
      state.cartData = action.payload;
    }),
  }),
});
export default basketSlice;
export const { addProductToBasket, setProductQuantity, removeProductQuantity, setCartData } =
  basketSlice.actions;
