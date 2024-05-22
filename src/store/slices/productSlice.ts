import { ProductProjection, type CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductListState = {
  allProducts: ProductProjection[];
  isLoading: boolean;
  errorMsg: string;
  productCategories: CategoryPagedQueryResponse | null;
};

const initialProductListState: ProductListState = {
  allProducts: [],
  isLoading: false,
  errorMsg: '',
  productCategories: null,
};

const productSlice = createSlice({
  name: 'productListData',
  initialState: initialProductListState,
  reducers: {
    loadAllProductsSuccess: (state, action: PayloadAction<ProductProjection[]>) => {
      state.allProducts = action.payload;
      state.isLoading = false;
    },
    setProductsIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProductsCategory: (state, action: PayloadAction<CategoryPagedQueryResponse>) => {
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
  setProductsCategory,
} = productSlice.actions;
