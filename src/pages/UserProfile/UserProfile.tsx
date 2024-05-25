import { Customer } from '@commercetools/platform-sdk';
import { FormEvent, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import AddressCard from '../../components/AddressCard/AddressCard';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import ModalAddress from '../../components/Modal/ModalAddress';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Overlay from '../../components/Modal/Overlay';
import { useStoreSelector } from '../../hooks/userRedux';
import useValidateInput from '../../hooks/useValidateInput';
import { validateAge, validateEmail, validateName, validatePassword } from '../../utils/functions';
import { ROUTE_PATH } from '../../utils/globalVariables';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const customer = useLoaderData() as Customer;
  const navigate = useNavigate();
  const { isUserAuthorized } = useStoreSelector((state) => state.userData);
  const [isEditUserInfo, setIsEditUserInfo] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isNewPasswordFieldsCorrect, setIsNewPasswordFieldsCorrect] = useState(true);
  const [isEditAddressModal, setIsEditAddressModal] = useState(false);
  const [isAddAddressModal, setIsAddAddressModal] = useState(false);
  const [isConfirmDeleteAddress, setIsConfirmDeleteAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState({});

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

  const {
    value: emailInputValue,
    // isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidateInput(validateEmail, customer.email);

  const {
    value: currentPasswordInputValue,
    // isValid: currentPasswordIsValid,
    hasError: currentPasswordHasError,
    inputBlurHandler: currentPasswordBlurHandler,
    valueChangeHandler: currentPasswordChangeHandler,
    reset: currentPasswordReset,
  } = useValidateInput(validatePassword);

  const {
    value: newPasswordInputValue,
    // isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    inputBlurHandler: newPasswordBlurHandler,
    valueChangeHandler: newPasswordChangeHandler,
    reset: newPasswordReset,
  } = useValidateInput(validatePassword);

  const {
    value: confirmNewPasswordInputValue,
    // isValid: confirmNewPasswordIsValid,
    hasError: confirmNewPasswordHasError,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    valueChangeHandler: confirmNewPasswordChangeHandler,
    reset: confirmNewPasswordReset,
  } = useValidateInput(validatePassword);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChangePassword = () => {
    const isNewPasswordConfirmed = newPasswordInputValue === confirmNewPasswordInputValue;
    // const isAllInputsCorrect = [
    //   isNewPasswordConfirmed,
    //   !newPasswordHasError,
    //   !confirmNewPasswordHasError,
    // ].every((val) => val);

    setIsNewPasswordFieldsCorrect(isNewPasswordConfirmed);

    // if (!isAllInputsCorrect) return;
    // console.log(isNewPasswordConfirmed);
    // console.log({ newPasswordInputValue, confirmNewPasswordInputValue });
    // TODO:
    // 1) send new password to API
    // 2) show loading
    // 3) after password has been changed
    //    show either success or error modal message
    // 4) reset password input fields
    // 5) setIsCurrentPasswordCorrect(false)
  };

  function handleDeleteAddress() {
    // 1) send request to API
    // 2) show loading spinner
    setIsConfirmDeleteAddress(false);
    // or show modal with error
  }

  function handleEditAddress() {
    // 1) send request to API
    // 2) show loading spinner
    setIsEditAddressModal(false);
  }

  function handleAddAddress() {
    // 1) send request to API
    // 2) show loading spinner
    setIsAddAddressModal(false);
  }

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
            invalid={isEditUserInfo && firstNameHasError}
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
            invalid={isEditUserInfo && lastNameHasError}
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
          invalid={isEditUserInfo && dateHasError}
          errorText="Must be older than 13 years"
          disabled={!isEditUserInfo}
        />
        <Input
          type="email"
          label="Current Email"
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          invalid={isEditUserInfo && emailHasError}
          value={emailInputValue}
          placeholder="Email"
          errorText="Invalid email address"
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
      <div>
        <div className={styles['input-group']}>
          <Button
            type="button"
            onClick={() => setIsChangePassword((prev) => !prev)}
            styleClass="green-outlined"
          >
            Change Password
          </Button>
          {isChangePassword && (
            <Overlay>
              <div className={styles['modal-password']}>
                <h2>Change password</h2>
                <Input
                  onBlur={currentPasswordBlurHandler}
                  onChange={currentPasswordChangeHandler}
                  value={currentPasswordInputValue}
                  invalid={currentPasswordHasError}
                  id="currentPassword"
                  label="Your current password"
                  type="password"
                  placeholder="Current Password"
                  errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and must not contain leading or trailing whitespace."
                />
                <fieldset className={styles['new-password-fieldset']}>
                  <legend>New Password</legend>
                  <Input
                    onBlur={newPasswordBlurHandler}
                    onChange={newPasswordChangeHandler}
                    value={newPasswordInputValue}
                    invalid={newPasswordHasError}
                    id="newPassword"
                    label="Your new password"
                    type="password"
                    placeholder="New Password"
                    errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and must not contain leading or trailing whitespace."
                  />
                  <Input
                    onBlur={confirmNewPasswordBlurHandler}
                    onChange={confirmNewPasswordChangeHandler}
                    value={confirmNewPasswordInputValue}
                    invalid={confirmNewPasswordHasError}
                    id="confirmNewPassword"
                    label="Confirm your new password"
                    type="password"
                    placeholder="Confirm New Password"
                    errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and must not contain leading or trailing whitespace."
                  />
                  {!isNewPasswordFieldsCorrect && (
                    <p className={styles['error-msg']}>Passwords does not match</p>
                  )}
                </fieldset>
                <div className={styles['modal-buttons']}>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsChangePassword(false);
                      setIsNewPasswordFieldsCorrect(true);
                      currentPasswordReset();
                      newPasswordReset();
                      confirmNewPasswordReset();
                    }}
                    styleClass="red-outlined"
                  >
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleChangePassword} styleClass="green-outlined">
                    Confirm
                  </Button>
                </div>
              </div>
            </Overlay>
          )}
        </div>
      </div>
      <h2>Addresses:</h2>
      <ul className={styles['address-cards']}>
        {customer.addresses.map((address) => (
          <AddressCard
            key={address.id}
            id={address.id}
            country={address.country}
            city={address.city}
            streetName={address.streetName}
            postalCode={address.postalCode}
            shippingAddressIds={customer.shippingAddressIds}
            billingAddressIds={customer.billingAddressIds}
            defaultShippingAddressId={customer.defaultShippingAddressId}
            defaultBillingAddressId={customer.defaultBillingAddressId}
            onClickDelete={() => {
              setIsConfirmDeleteAddress(true);
            }}
            onClickEdit={() => {
              const isDefaultShipping = customer.shippingAddressIds?.includes(
                customer.defaultShippingAddressId!,
              );
              const isDefaultBilling = customer.billingAddressIds?.includes(
                customer.defaultBillingAddressId!,
              );

              setEditingAddress({
                id: address.id,
                country: address.country,
                city: address.city,
                streetName: address.streetName,
                postalCode: address.postalCode,
                isDefaultBilling,
                isDefaultShipping,
              });
              setIsEditAddressModal(true);
            }}
          />
        ))}
      </ul>
      <Button onClick={() => setIsAddAddressModal(true)} type="button" styleClass="green-outlined">
        Add New Address
      </Button>
      {isEditAddressModal && (
        <Overlay>
          <ModalAddress
            onCancel={() => setIsEditAddressModal(false)}
            onConfirm={() => handleEditAddress()}
            editingAddress={editingAddress}
          />
        </Overlay>
      )}
      {isAddAddressModal && (
        <Overlay>
          <ModalAddress
            onCancel={() => setIsAddAddressModal(false)}
            onConfirm={() => handleAddAddress()}
            editingAddress={{}}
          />
        </Overlay>
      )}
      {isConfirmDeleteAddress && (
        <Overlay>
          <ModalConfirm
            onCancel={() => setIsConfirmDeleteAddress(false)}
            onConfirm={() => handleDeleteAddress()}
            message="Are you sure want to delete this address?"
          />
        </Overlay>
      )}
    </form>
  );
}
