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
  setDefaultBillingAddress as apiSetDefaultBillingAddress,
  setDefaultShippingAddress as apiSetDefaultShippingAddress,
  setDefaultShippingAndBillingAddress as apiSetDefaultShippingAndBillingAddress,
} from '../../api/profile';
import AddressCard from '../../components/AddressCard/AddressCard';
import Button from '../../components/Button/Button';
import FormChangePassword from '../../components/FormChangePassword/FormChangePassword';
import FormPersonalData from '../../components/FormPersonalData/FormPersonalData';
import Loader from '../../components/Modal/Loader';
import ModalAddress from '../../components/Modal/ModalAddress';
import ModalAlert from '../../components/Modal/ModalAlert';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Overlay from '../../components/Modal/Overlay';
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

  const [addresses, setAddresses] = useState(customer.addresses);
  const [shippingAddressIds, setShippingAddressIds] = useState(customer.shippingAddressIds);
  const [billingAddressIds, setBillingAddressIds] = useState(customer.billingAddressIds);
  const [defaultShippingAddressId, setDefaultShippingAddressId] = useState(
    customer.defaultShippingAddressId,
  );
  const [defaultBillingAddressId, setDefaultBillingAddressId] = useState(
    customer.defaultBillingAddressId,
  );

  const [userEmail, setUserEmail] = useState(customer.email);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isEditAddressModal, setIsEditAddressModal] = useState(false);
  const [isAddAddressModal, setIsAddAddressModal] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState({});
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
      /* TODO: Fix email */
      loginUser({ email: userEmail, password: newPassword });
      setSuccessMsg('Your password has been successfully changed.');
      setIsChangePassword(false);
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    setDeleteAddressId(null);
    setIsLoading(true);

    try {
      const res = await removeAddress(userVersion, userId, deleteAddressId!);
      setAddresses(res.body.addresses);
      dispatch(setUserVersion(res.body.version));
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = async (address: BaseAddress) => {
    setIsEditAddressModal(false);
    setIsLoading(true);

    try {
      const res = await changeAddress(userVersion, userId, address);
      setAddresses(res.body.addresses);
      dispatch(setUserVersion(res.body.version));
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async (address: BaseAddress, addressType?: string) => {
    setIsAddAddressModal(false);
    setIsLoading(true);

    try {
      const res = await addNewAddress(userVersion, userId, address, addressType || '');
      dispatch(setUserVersion(res.body.version));
      setAddresses(res.body.addresses);

      if (addressType === 'shipping') {
        setShippingAddressIds(res.body.shippingAddressIds);
      }

      if (addressType === 'billing') {
        setBillingAddressIds(res.body.billingAddressIds);
      }
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeDefaultAddress = async (id: string) => {
    setIsLoading(true);

    const isShipping = shippingAddressIds?.includes(id);
    const isBilling = billingAddressIds?.includes(id);

    try {
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
            onChangeDefault={handleChangeDefaultAddress}
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
            onConfirm={handleEditAddress}
            editingAddress={editingAddress}
          />
        </Overlay>
      )}
      {isAddAddressModal && (
        <Overlay>
          <ModalAddress
            onCancel={() => setIsAddAddressModal(false)}
            onConfirm={handleAddAddress}
            editingAddress={{}}
          />
        </Overlay>
      )}
      {deleteAddressId && (
        <Overlay>
          <ModalConfirm
            onCancel={() => setDeleteAddressId(null)}
            onConfirm={handleDeleteAddress}
            message="Are you sure want to delete this address?"
          />
        </Overlay>
      )}
      {successMsg && (
        <Overlay>
          <ModalAlert onConfirm={() => setSuccessMsg(null)} message={successMsg} />
        </Overlay>
      )}
    </div>
  );
}
