import { ProductProjection } from '@commercetools/platform-sdk';
import apiRoot from './apiRoot';

export const getAllProducts = async (): Promise<ProductProjection[]> => {
  const response = await apiRoot.productProjections().get().execute();
  return response.body.results;
};

export const getProductById = async (ID: string): Promise<ProductProjection> => {
  const response = await apiRoot.productProjections().withId({ ID }).get().execute();
  return response.body;
};
