import { Customer } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentCustomer } from '../../api/customers';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Overlay from '../../components/Modal/Overlay';
import { useStoreSelector } from '../../hooks/userRedux';
import { ROUTE_PATH } from '../../utils/globalVariables';

export default function UserProfile() {
  const navigate = useNavigate();
  const { isUserAuthorized } = useStoreSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<null | Customer>(null);

  useEffect(() => {
    if (!isUserAuthorized) {
      setIsLoading(false);
      navigate(ROUTE_PATH.main);
      return;
    }

    async function getUser() {
      const user = await getCurrentCustomer();
      setIsLoading(false);
      setCustomer(user);
    }

    getUser();
  }, [isUserAuthorized, navigate]);

  if (isLoading)
    return (
      <Overlay>
        <LoadingSpinner />
      </Overlay>
    );

  if (!customer) return null;

  return (
    <div>
      <h1>
        Hello, {customer.firstName} {customer.lastName}
      </h1>
      <p>Date of birth: {customer.dateOfBirth}</p>
      <ul>
        Addresses:
        {customer.addresses.map((address) => (
          <li key={address.id}>
            {address.id &&
              customer.shippingAddressIds?.includes(address.id) &&
              'Shipping Address: '}
            {address.id && customer.billingAddressIds?.includes(address.id) && 'Billing Address: '}
            <br />
            Country: {address.country}
            <br />
            City: {address.city}
            <br />
            Street Name: {address.streetName}
            <br />
            Postal Code: {address.postalCode}
            <br />
            {address.id === customer.defaultShippingAddressId && 'This is Default Shipping Address'}
            {address.id === customer.defaultBillingAddressId && 'This is Default Billing Address'}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
