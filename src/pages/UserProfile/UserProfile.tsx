import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../api/customers';
import {
  addNewAddress,
  changeAddress,
  changeUserPassword,
  removeAddress,
  updateCustomerPersonalData,
  setDefaultBillingAddress as apiSetDefaultBillingAddress,
  setDefaultShippingAddress as apiSetDefaultShippingAddress,
  setDefaultShippingAndBillingAddress as apiSetDefaultShippingAndBillingAddress,
} from '../../api/profile';
import AddressCard from '../../components/AddressCard/AddressCard';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loader from '../../components/Modal/Loader';
import ModalAddress from '../../components/Modal/ModalAddress';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Overlay from '../../components/Modal/Overlay';
import { useStoreSelector } from '../../hooks/userRedux';
import useValidateInput from '../../hooks/useValidateInput';
import { setUserVersion } from '../../store/slices/userSlice';
import { IUpdateUserInfo } from '../../types/interfaces';
import { validateAge, validateEmail, validateName, validatePassword } from '../../utils/functions';
import { ROUTE_PATH } from '../../utils/globalVariables';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const customer = useLoaderData() as Customer;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserAuthorized, userId, userVersion } = useStoreSelector((state) => state.userData);

  const [addresses, setAddresses] = useState(customer.addresses);
  const [shippingAddressIds, setShippingAddressIds] = useState(customer.shippingAddressIds);
  const [billingAddressIds, setBillingAddressIds] = useState(customer.billingAddressIds);
  const [defaultShippingAddressId, setDefaultShippingAddressId] = useState(
    customer.defaultShippingAddressId,
  );
  const [defaultBillingAddressId, setDefaultBillingAddressId] = useState(
    customer.defaultBillingAddressId,
  );

  const [isEditUserInfo, setIsEditUserInfo] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isNewPasswordFieldsCorrect, setIsNewPasswordFieldsCorrect] = useState(true);
  const [isEditAddressModal, setIsEditAddressModal] = useState(false);
  const [isAddAddressModal, setIsAddAddressModal] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  if (!isUserAuthorized) navigate(ROUTE_PATH.main);

  const {
    value: firstNameInputValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    inputBlurHandler: firstNameBlurHandler,
    valueChangeHandler: firstNameChangeHandler,
  } = useValidateInput(validateName, customer.firstName);

  const {
    value: lastNameInputValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    inputBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
  } = useValidateInput(validateName, customer.lastName);

  const {
    value: dateInputValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    inputBlurHandler: dateBlurHandler,
    valueChangeHandler: dateChangeHandler,
  } = useValidateInput(validateAge, customer.dateOfBirth);

  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidateInput(validateEmail, customer.email);

  const {
    value: currentPasswordInputValue,
    isValid: currentPasswordIsValid,
    hasError: currentPasswordHasError,
    inputBlurHandler: currentPasswordBlurHandler,
    valueChangeHandler: currentPasswordChangeHandler,
    reset: currentPasswordReset,
  } = useValidateInput(validatePassword);

  const {
    value: newPasswordInputValue,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    inputBlurHandler: newPasswordBlurHandler,
    valueChangeHandler: newPasswordChangeHandler,
    reset: newPasswordReset,
  } = useValidateInput(validatePassword);

  const {
    value: confirmNewPasswordInputValue,
    isValid: confirmNewPasswordIsValid,
    hasError: confirmNewPasswordHasError,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    valueChangeHandler: confirmNewPasswordChangeHandler,
    reset: confirmNewPasswordReset,
  } = useValidateInput(validatePassword);

  const handleModalError = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditUserInfo) return;

    const isAllValid = [emailIsValid, firstNameIsValid, lastNameIsValid, dateIsValid].every(
      (value) => value,
    );

    if (!isAllValid) return;

    const userInfo: IUpdateUserInfo = {
      email: emailInputValue,
      firstName: firstNameInputValue,
      lastName: lastNameInputValue,
      dateOfBirth: dateInputValue,
    };

    setIsLoading(true);

    try {
      const res = await updateCustomerPersonalData(userVersion, userId, userInfo);
      dispatch(setUserVersion(res.body.version));
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      // TODO:
      // 1) show spinner on loading
      // 2) show error modal to user
      // console.error(error);
    } finally {
      setIsLoading(false);
      setIsEditUserInfo(false);
    }
  };

  const handleChangePassword = async () => {
    const isNewPasswordConfirmed = newPasswordInputValue === confirmNewPasswordInputValue;
    const isAllInputsCorrect = [
      isNewPasswordConfirmed,
      currentPasswordIsValid,
      newPasswordIsValid,
      confirmNewPasswordIsValid,
    ].every((val) => val);

    setIsNewPasswordFieldsCorrect(isNewPasswordConfirmed);

    if (!isAllInputsCorrect) return;

    try {
      const res = await changeUserPassword(
        userVersion,
        userId,
        currentPasswordInputValue,
        newPasswordInputValue,
      );
      dispatch(setUserVersion(res.body.version));
      // TODO:
      // 1) Update auth token
      logoutUser();
      loginUser({ email: emailInputValue, password: newPasswordInputValue });
    } catch (error) {
      // TODO:
      // 2) show loading
      // 3) after password has been changed
      //    show either success or error modal message
      // 4) reset password input fields
      // 5) setIsCurrentPasswordCorrect(false)
    }

    /*
    // TODO:
    // handle invalid token error
    */
  };

  async function handleDeleteAddress(addressId: string) {
    // 1) send request to API
    // 2) show loading spinner

    const res = await removeAddress(userVersion, userId, addressId);
    setAddresses(res.body.addresses);
    dispatch(setUserVersion(res.body.version));
    setDeleteAddressId(null);
    // or show modal with error
  }

  async function handleEditAddress(address: BaseAddress) {
    // 1) send request to API
    // 2) show loading spinner

    const res = await changeAddress(userVersion, userId, address);
    setAddresses(res.body.addresses);
    dispatch(setUserVersion(res.body.version));
    setIsEditAddressModal(false);
  }

  async function handleAddAddress(address: BaseAddress, addressType?: string) {
    // 1) send request to API
    // 2) show loading spinner

    const res = await addNewAddress(userVersion, userId, address, addressType || '');
    dispatch(setUserVersion(res.body.version));
    setAddresses(res.body.addresses);

    if (addressType === 'shipping') {
      setShippingAddressIds(res.body.shippingAddressIds);
    }

    if (addressType === 'billing') {
      setBillingAddressIds(res.body.billingAddressIds);
    }

    setIsAddAddressModal(false);
  }

  async function handleChangeDefaultAddress(id: string) {
    const isShipping = shippingAddressIds?.includes(id);
    const isBilling = billingAddressIds?.includes(id);

    if (isShipping && isBilling) {
      const res = await apiSetDefaultShippingAndBillingAddress(userVersion, userId, id);
      dispatch(setUserVersion(res.body.version));
      setDefaultShippingAddressId(id);
      setDefaultBillingAddressId(id);
      return;
    }

    if (isShipping) {
      const res = await apiSetDefaultShippingAddress(userVersion, userId, id);
      dispatch(setUserVersion(res.body.version));
      setDefaultShippingAddressId(id);
      return;
    }

    if (isBilling) {
      const res = await apiSetDefaultBillingAddress(userVersion, userId, id);
      dispatch(setUserVersion(res.body.version));
      setDefaultBillingAddressId(id);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        <div className={styles['input-group']}>
          <Button
            onClick={() => setIsEditUserInfo((prev) => !prev)}
            type="button"
            styleClass="green-outlined"
          >
            Edit Personal Data
          </Button>
          <Button disabled={!isEditUserInfo} type="submit" styleClass="green-outlined">
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={() => setIsChangePassword((prev) => !prev)}
            styleClass="green-outlined"
          >
            Change Password
          </Button>
        </div>
      </div>
      <div>
        <div className={styles['input-group']}>
          {/* <Button
            type="button"
            onClick={() => setIsChangePassword((prev) => !prev)}
            styleClass="green-outlined"
          >
            Change Password
          </Button> */}
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
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            id={address.id}
            country={address.country}
            city={address.city}
            streetName={address.streetName}
            postalCode={address.postalCode}
            shippingAddressIds={shippingAddressIds}
            billingAddressIds={billingAddressIds}
            defaultShippingAddressId={defaultShippingAddressId}
            defaultBillingAddressId={defaultBillingAddressId}
            onClickDelete={() => {
              setDeleteAddressId(address.id!);
            }}
            onClickEdit={() => {
              const isDefaultShipping = shippingAddressIds?.includes(defaultShippingAddressId!);
              const isDefaultBilling = billingAddressIds?.includes(defaultBillingAddressId!);

              setEditingAddress({
                id: address.id,
                country: address.country,
                city: address.city,
                streetName: address.streetName,
                postalCode: address.postalCode,
                isShipping: shippingAddressIds?.includes(address.id || ''),
                isBilling: billingAddressIds?.includes(address.id || ''),
                isDefaultBilling,
                isDefaultShipping,
              });
              setIsEditAddressModal(true);
            }}
            onChangeDefault={(id: string) => handleChangeDefaultAddress(id)}
          />
        ))}
      </ul>
      <Button onClick={() => setIsAddAddressModal(true)} type="button" styleClass="green-outlined">
        + Add New Address
      </Button>
      <Loader isLoading={isLoading} errMsg={error?.message} errorHandler={handleModalError} />
      {isEditAddressModal && (
        <Overlay>
          <ModalAddress
            onCancel={() => setIsEditAddressModal(false)}
            onConfirm={(address: BaseAddress) => handleEditAddress(address)}
            editingAddress={editingAddress}
          />
        </Overlay>
      )}
      {isAddAddressModal && (
        <Overlay>
          <ModalAddress
            onCancel={() => setIsAddAddressModal(false)}
            onConfirm={(address: BaseAddress, addressType?: string) =>
              handleAddAddress(address, addressType)
            }
            editingAddress={{}}
          />
        </Overlay>
      )}
      {deleteAddressId && (
        <Overlay>
          <ModalConfirm
            onCancel={() => setDeleteAddressId(null)}
            onConfirm={() => handleDeleteAddress(deleteAddressId)}
            message="Are you sure want to delete this address?"
          />
        </Overlay>
      )}
    </form>
  );
}
