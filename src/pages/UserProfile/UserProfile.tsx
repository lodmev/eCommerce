import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../api/customers';
import {
  addNewAddress,
  changeAddress,
  changeUserPassword,
  removeAddress,
  updateCustomerPersonalData,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
  setDefaultShippingAndBillingAddress,
} from '../../api/profile';
import AddressCardsList from '../../components/AddressCardsList/AddressCardsList';
import Button from '../../components/Button/Button';
import FormChangePassword from '../../components/FormChangePassword/FormChangePassword';
import FormPersonalData from '../../components/FormPersonalData/FormPersonalData';
import Loader from '../../components/Modal/Loader';
import { useStoreSelector } from '../../hooks/userRedux';
import { setUserVersion } from '../../store/slices/userSlice';
import { IUpdateUserInfo } from '../../types/interfaces';
import { ROUTE_PATH } from '../../utils/globalVariables';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const customer = useLoaderData() as Customer;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserAuthorized, userId, userVersion } = useStoreSelector((state) => state.userData);

  const [userEmail, setUserEmail] = useState(customer.email);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isUserAuthorized) navigate(ROUTE_PATH.main);

  const handleModalError = () => {
    setError(null);
  };

  const handleChangePersonalData = async (userInfo: IUpdateUserInfo) => {
    setIsLoading(true);

    try {
      const res = await updateCustomerPersonalData(userVersion, userId, userInfo);
      dispatch(setUserVersion(res.body.version));
      setSuccessMsg('Your personal data has been successfully updated!');
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);

    try {
      const res = await changeUserPassword(userVersion, userId, currentPassword, newPassword);
      dispatch(setUserVersion(res.body.version));
      logoutUser();
      loginUser({ email: userEmail, password: newPassword });
      setSuccessMsg('Your password has been successfully changed.');
      setIsChangePassword(false);
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    setIsLoading(true);

    try {
      const res = await removeAddress(userVersion, userId, addressId);
      dispatch(setUserVersion(res.body.version));
      return res;
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const handleEditAddress = async (address: BaseAddress) => {
    setIsLoading(true);

    try {
      const res = await changeAddress(userVersion, userId, address);
      dispatch(setUserVersion(res.body.version));
      return res;
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const handleAddAddress = async (address: BaseAddress, addressType?: string) => {
    setIsLoading(true);

    try {
      const res = await addNewAddress(userVersion, userId, address, addressType || '');
      dispatch(setUserVersion(res.body.version));
      return res;
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const handleChangeDefaultAddress = async (
    isShipping: boolean,
    isBilling: boolean,
    id: string,
  ) => {
    setIsLoading(true);

    try {
      if (isShipping && isBilling) {
        const res = await setDefaultShippingAndBillingAddress(userVersion, userId, id);
        dispatch(setUserVersion(res.body.version));
        return;
      }

      if (isShipping) {
        const res = await setDefaultShippingAddress(userVersion, userId, id);
        dispatch(setUserVersion(res.body.version));
        return;
      }

      if (isBilling) {
        const res = await setDefaultBillingAddress(userVersion, userId, id);
        dispatch(setUserVersion(res.body.version));
      }
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <FormPersonalData
        customer={customer}
        onEmailUpdate={(email: string) => setUserEmail(email)}
        onSubmit={handleChangePersonalData}
      />
      <Button
        type="button"
        onClick={() => setIsChangePassword((prev) => !prev)}
        styleClass="green-outlined"
      >
        Change Password
      </Button>
      {isChangePassword && (
        <FormChangePassword
          onCancel={() => setIsChangePassword(false)}
          onChangePassword={handleChangePassword}
        />
      )}
      <h2>Addresses:</h2>
      <AddressCardsList
        customer={customer}
        onEditAddress={handleEditAddress}
        onDeleteAddress={handleDeleteAddress}
        onChangeDefaultAddress={handleChangeDefaultAddress}
        onAddAddress={handleAddAddress}
        successMsg={successMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <Loader isLoading={isLoading} errMsg={error?.message} errorHandler={handleModalError} />
    </div>
  );
}
