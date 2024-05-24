import {
  Category,
  CategoryPagedQueryResponse,
  ErrorResponse,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { StoreDispatch } from '../store';
import { getAllProducts, getProductsCategories } from '../../api/products';
import {
  setLoadProductsError,
  loadAllProductsSuccess,
  setProductsIsLoading,
  setProductCategories,
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
    const categoriesQuery: CategoryPagedQueryResponse = await getProductsCategories();
    const categoriesArray = categoriesQuery.results;
    const categories = new Map<string, Category>();
    categoriesArray.forEach((category) => {
      categories.set(category.id, category);
    });
    dispatch(setProductCategories(categoriesArray));
  } catch (error) {
    const err = error as ErrorResponse;
    dispatch(setLoadProductsError(err.message));
  } finally {
    dispatch(setProductsIsLoading(false));
  }
};

export const loadProductById = (/* ID: string */) => async (/* dispatch: StoreDispatch */) => {};
