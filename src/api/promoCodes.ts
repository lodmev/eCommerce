import { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import { getAuthOrAnonApi } from './apiRoot';

export default async function queryDiscountCodes(): Promise<DiscountCodePagedQueryResponse> {
  const apiClient = getAuthOrAnonApi();
  const response = await apiClient.discountCodes().get().execute();
  return response.body;
}
