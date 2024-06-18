import { BaseAddress, ClientResponse, Customer } from '@commercetools/platform-sdk';
import { useState } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import Button from '../Button/Button';
import ModalAddress from '../Modal/ModalAddress';
import ModalAlert from '../Modal/ModalAlert';
import ModalConfirm from '../Modal/ModalConfirm';
import Overlay from '../Modal/Overlay';
import styles from './AddressCardsList.module.css';

type Props = {
  customer: Customer;
  onDeleteAddress: (addressId: string) => Promise<ClientResponse<Customer> | null>;
  onEditAddress: (address: BaseAddress) => Promise<ClientResponse<Customer> | null>;
  onChangeDefaultAddress: (isShipping: boolean, isBilling: boolean, id: string) => void;
  onAddAddress: (
    address: BaseAddress,
    addressType?: string,
  ) => Promise<ClientResponse<Customer> | null>;
  successMsg: string | null;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function AddressCardsList(props: Props) {
  const {
    customer,
    onDeleteAddress,
    onEditAddress,
    onChangeDefaultAddress,
    onAddAddress,
    successMsg,
    setSuccessMsg,
  } = props;

  const [addresses, setAddresses] = useState(customer.addresses);

  const [isEditAddressModal, setIsEditAddressModal] = useState(false);
  const [isAddAddressModal, setIsAddAddressModal] = useState(false);

  const [deleteAddressId, setDeleteAddressId] = useState<string | null>(null);
  const [shippingAddressIds, setShippingAddressIds] = useState(customer.shippingAddressIds);
  const [billingAddressIds, setBillingAddressIds] = useState(customer.billingAddressIds);
  const [defaultShippingAddressId, setDefaultShippingAddressId] = useState(
    customer.defaultShippingAddressId,
  );
  const [defaultBillingAddressId, setDefaultBillingAddressId] = useState(
    customer.defaultBillingAddressId,
  );

  const [editingAddress, setEditingAddress] = useState({});

  return (
    <>
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
            onChangeDefault={(id: string) => {
              const isShipping = !!shippingAddressIds?.includes(id);
              const isBilling = !!billingAddressIds?.includes(id);

              if (isShipping) setDefaultShippingAddressId(id);
              if (isBilling) setDefaultBillingAddressId(id);

              onChangeDefaultAddress(isShipping, isBilling, id);
            }}
          />
        ))}
      </ul>
      <Button onClick={() => setIsAddAddressModal(true)} type="button" styleClass="green-outlined">
        + Add New Address
      </Button>
      {isEditAddressModal && (
        <Overlay>
          <ModalAddress
            onCancel={() => setIsEditAddressModal(false)}
            onConfirm={async (address: BaseAddress) => {
              const res = await onEditAddress(address);
              if (res) setAddresses(res.body.addresses);
              setIsEditAddressModal(false);
            }}
            editingAddress={editingAddress}
          />
        </Overlay>
      )}
      {isAddAddressModal && (
        <Overlay>
          <ModalAddress
            onCancel={() => setIsAddAddressModal(false)}
            onConfirm={async (address: BaseAddress, addressType?: string | undefined) => {
              const res = await onAddAddress(address, addressType);

              if (res === null) return;

              setAddresses(res.body.addresses);

              if (addressType === 'shipping') {
                setShippingAddressIds(res.body.shippingAddressIds);
              }

              if (addressType === 'billing') {
                setBillingAddressIds(res.body.billingAddressIds);
              }

              setIsAddAddressModal(false);
            }}
            editingAddress={{}}
          />
        </Overlay>
      )}
      {deleteAddressId && (
        <Overlay>
          <ModalConfirm
            onCancel={() => setDeleteAddressId(null)}
            onConfirm={async () => {
              const res = await onDeleteAddress(deleteAddressId);

              if (res === null) return;

              setAddresses(res.body.addresses);

              setDeleteAddressId(null);
            }}
            message="Are you sure want to delete this address?"
          />
        </Overlay>
      )}
      {successMsg && (
        <Overlay>
          <ModalAlert onConfirm={() => setSuccessMsg(null)} message={successMsg} />
        </Overlay>
      )}
    </>
  );
}
