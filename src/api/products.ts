import { ProductProjection } from '@commercetools/platform-sdk';
import { getCurrentApiClient } from './apiRoot';

export const getAllProducts = async (): Promise<ProductProjection[]> => {
  const response = await getCurrentApiClient().productProjections().get().execute();
  return response.body.results;
};

export const getProductById = async (ID: string): Promise<ProductProjection> => {
  const response = await getCurrentApiClient().productProjections().withId({ ID }).get().execute();
  return response.body;
};

// export const getProductsCategories = async (): ;
