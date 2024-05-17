import { ProductProjection } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type ProductListState = {
  allProducts: ProductProjection[];
  isLoading: boolean;
  errorMsg: string;
};

const initialProductListState: ProductListState = {
  allProducts: [],
  isLoading: false,
  errorMsg: '',
};

const productListSlice = createSlice({
  name: 'productListData',
  initialState: initialProductListState,
  reducers: {
    loadAllProductsSuccess: (state, action: PayloadAction<ProductProjection[]>) => {
      state.allProducts = action.payload;
      state.isLoading = false;
    },
    setAllProductsIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loadAllProductsError: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
  },
});
export default productListSlice;
export const { loadAllProductsSuccess, setAllProductsIsLoading, loadAllProductsError } = productListSlice.actions;