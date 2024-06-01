import { ProductProjection } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BasketState = {
  productsInBasket: ProductProjection[];
  productIdToQuantity: Record<string, number>;
};

const initialBasketState: BasketState = {
  productsInBasket: [],
  productIdToQuantity: {},
};

const basketSlice = createSlice({
  name: 'basketData',
  initialState: initialBasketState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<ProductProjection>) => {
      const { id } = action.payload;
      if (state.productsInBasket.find((product) => product.id === id)) {
        return;
      }
      state.productsInBasket = [...state.productsInBasket, action.payload];
      state.productIdToQuantity[action.payload.id] = 1;
    },
    setProductQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      state.productIdToQuantity[action.payload.id] = action.payload.quantity;
    },
  },
});
export default basketSlice;
export const { addProductToBasket, setProductQuantity } = basketSlice.actions;
