import { ErrorResponse, ProductProjection } from '@commercetools/platform-sdk';
import { StoreDispatch } from '../store';
import { getAllProducts, getProductsCategories } from '../../api/products';
import {
  setLoadProductsError,
  loadAllProductsSuccess,
  setProductsIsLoading,
  setProductsCategory,
} from '../slices/productSlice';

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

export const loadCategories = () => async (dispatch: StoreDispatch) => {
  dispatch(setProductsIsLoading(true));
  try {
    const categories = await getProductsCategories();
    dispatch(setProductsCategory(categories));
  } catch (error) {
    const err = error as ErrorResponse;
    dispatch(setLoadProductsError(err.message));
  } finally {
    dispatch(setProductsIsLoading(false));
  }
};

export const loadProductById = (/* ID: string */) => async (/* dispatch: StoreDispatch */) => {};