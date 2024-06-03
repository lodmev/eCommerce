import { getCurrentCustomer } from '../../api/customers';
import { getToken } from '../../utils/token';

export default async function userProfileLoader() {
  if (!getToken()) return undefined;
  const customer = await getCurrentCustomer();
  return customer;
}
