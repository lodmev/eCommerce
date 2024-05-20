import { Customer } from '@commercetools/platform-sdk';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentCustomer } from '../../api/customers';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Overlay from '../../components/Modal/Overlay';
import { useStoreSelector } from '../../hooks/userRedux';
import { ROUTE_PATH } from '../../utils/globalVariables';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const navigate = useNavigate();
  const { isUserAuthorized } = useStoreSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<null | Customer>(null);
  const [isEditUserInfo, setIsEditUserInfo] = useState(false);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>User Profile</h1>
      <div>
        <div className={styles['input-group']}>
          <Input
            label="First Name"
            id="first-name"
            type="text"
            value={customer.firstName}
            disabled={!isEditUserInfo}
          />
          <Input
            label="Last Name"
            id="last-name"
            type="text"
            value={customer.lastName}
            disabled={!isEditUserInfo}
          />
        </div>
        <Input
          type="date"
          label="Date of birth"
          value={customer.dateOfBirth}
          disabled={!isEditUserInfo}
        />
        <Input
          type="email"
          label="Current Email"
          value={customer.email}
          disabled={!isEditUserInfo}
        />
        <Button
          onClick={() => setIsEditUserInfo((prev) => !prev)}
          type="button"
          styleClass="green-filled"
        >
          Edit Personal Data
        </Button>
      </div>
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
    </form>
  );
}
