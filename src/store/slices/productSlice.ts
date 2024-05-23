import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductListState = {
  allProducts: ProductProjection[];
  isLoading: boolean;
  errorMsg: string;
  productCategories: Category[];
};

const initialProductState: ProductListState = {
  allProducts: [],
  isLoading: false,
  errorMsg: '',
  productCategories: [],
};

const productSlice = createSlice({
  name: 'productData',
  initialState: initialProductState,
  reducers: {
    loadAllProductsSuccess: (state, action: PayloadAction<ProductProjection[]>) => {
      state.allProducts = action.payload;
      state.isLoading = false;
    },
    setProductsIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProductCategories: (state, action: PayloadAction<Category[]>) => {
      state.productCategories = action.payload;
    },

    setLoadProductsError: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
  },
});
export default productSlice;
export const {
  loadAllProductsSuccess,
  setProductsIsLoading,
  setLoadProductsError,
  setProductCategories,
} = productSlice.actions;
