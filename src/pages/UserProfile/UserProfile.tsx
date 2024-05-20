import { Customer } from '@commercetools/platform-sdk';
import { FormEvent, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useStoreSelector } from '../../hooks/userRedux';
import useValidateInput from '../../hooks/useValidateInput';
import { validateAge, validateName } from '../../utils/functions';
import { ROUTE_PATH } from '../../utils/globalVariables';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const customer = useLoaderData() as Customer;
  const navigate = useNavigate();
  const { isUserAuthorized } = useStoreSelector((state) => state.userData);
  const [isEditUserInfo, setIsEditUserInfo] = useState(false);

  if (!isUserAuthorized) navigate(ROUTE_PATH.main);

  // console.log('user profile customer', customer);

  const {
    value: firstNameInputValue,
    // isValid: firstNameIsValid,
    hasError: firstNameHasError,
    inputBlurHandler: firstNameBlurHandler,
    valueChangeHandler: firstNameChangeHandler,
  } = useValidateInput(validateName, customer.firstName);

  const {
    value: lastNameInputValue,
    // isValid: lastNameIsValid,
    hasError: lastNameHasError,
    inputBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
  } = useValidateInput(validateName, customer.lastName);

  const {
    value: dateInputValue,
    // isValid: dateIsValid,
    hasError: dateHasError,
    inputBlurHandler: dateBlurHandler,
    valueChangeHandler: dateChangeHandler,
  } = useValidateInput(validateAge, customer.dateOfBirth);

  // if (isLoading)
  //   return (
  //     <Overlay>
  //       <LoadingSpinner />
  //     </Overlay>
  //   );

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
            onBlur={firstNameBlurHandler}
            onChange={firstNameChangeHandler}
            value={firstNameInputValue}
            invalid={firstNameHasError}
            placeholder="First Name"
            errorText="Must contain at least one character and no special characters or numbers"
            disabled={!isEditUserInfo}
          />
          <Input
            label="Last Name"
            id="last-name"
            type="text"
            onBlur={lastNameBlurHandler}
            onChange={lastNameChangeHandler}
            value={lastNameInputValue}
            invalid={lastNameHasError}
            placeholder="Last Name"
            errorText="Must contain at least one character and no special characters or numbers"
            disabled={!isEditUserInfo}
          />
        </div>
        <Input
          type="date"
          label="Date of birth"
          onBlur={dateBlurHandler}
          onChange={dateChangeHandler}
          value={dateInputValue}
          invalid={dateHasError}
          errorText="Must be older than 13 years"
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
          styleClass="green-outlined"
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
