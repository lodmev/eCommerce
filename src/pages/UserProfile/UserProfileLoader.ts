import { getCurrentCustomer } from '../../api/customers';

export default async function userProfileLoader() {
  const customer = await getCurrentCustomer();
  return customer;
}
