import { ErrorResponse, ProductProjection } from '@commercetools/platform-sdk';
import { StoreDispatch } from '../store';
import { getAllProducts } from '../../api/products';
import {
  setLoadProductsError,
  loadAllProductsSuccess,
  setProductsIsLoading,
} from '../slices/productSlice';
// import debug from '../../utils/debug';

export const loadAllProducts = () => async (dispatch: StoreDispatch) => {
  dispatch(setProductsIsLoading(true));
  try {
    const allProductsList: ProductProjection[] = await getAllProducts();
    dispatch(loadAllProductsSuccess(allProductsList));
  } catch (error) {
    const err = error as ErrorResponse;
    dispatch(setLoadProductsError(err.message));
  }
};

export const loadProductById = (/* ID: string */) => async (/* dispatch: StoreDispatch */) => {};
