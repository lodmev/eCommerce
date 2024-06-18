import { getCurrentCustomer } from '../../api/customers';
import { isUserAuthorized } from '../../utils/token';

export default async function userProfileLoader() {
  if (!isUserAuthorized()) return undefined;
  const customer = await getCurrentCustomer();
  return customer;
}
