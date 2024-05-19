import { ErrorResponse, ProductProjection } from '@commercetools/platform-sdk';
import { StoreDispatch } from '../store';
import { getAllProducts } from '../../api/products';
import {
  loadAllProductsError,
  loadAllProductsSuccess,
  setAllProductsIsLoading,
} from '../slices/productListSlice';

export const loadAllProducts = () => async (dispatch: StoreDispatch) => {
  dispatch(setAllProductsIsLoading(true));
  try {
    const allProductsList: ProductProjection[] = await getAllProducts();
    dispatch(loadAllProductsSuccess(allProductsList));
  } catch (error) {
    const err = error as ErrorResponse;
    dispatch(loadAllProductsError(err.message));
  }
};

export const loadFakeForEsLint = () => {};
