import { ProductProjection } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import debug from '../../utils/debug';

type ProductState = {
  allProducts: ProductProjection[];
  isLoading: boolean;
  errorMsg: string;
};

const initialProductState: ProductState = {
  allProducts: [],
  isLoading: false,
  errorMsg: '',
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
    setLoadProductsError: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
  },
});
export default productSlice;
export const { loadAllProductsSuccess, setProductsIsLoading, setLoadProductsError } =
  productSlice.actions;
