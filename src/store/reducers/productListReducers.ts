import { StoreDispatch } from '../store.ts';
import { ErrorResponse, ProductProjection } from '@commercetools/platform-sdk';
import { getAllProducts } from '../../api/products.ts';
import { loadAllProductsError, loadAllProductsSuccess, setAllProductsIsLoading } from '../slices/productListSlice.ts';

export const loadAllProducts = () => async (dispatch: StoreDispatch)=> {
  dispatch(setAllProductsIsLoading(true))
  try {
    const allProductsList: ProductProjection[] = await getAllProducts();
    dispatch(loadAllProductsSuccess(allProductsList));
  } catch (error) {
    const err = error as ErrorResponse;
    dispatch(loadAllProductsError(err.message));
  }
}