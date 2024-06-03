import { Address } from '@commercetools/platform-sdk';
import { ChangeEvent } from 'react';
import Button from '../Button/Button';
import styles from './AddressCard.module.css';

interface Props extends Address {
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  onChangeDefault?: (id: string) => void;
}

export default function AddressCard(props: Props) {
  const {
    id,
    country,
    city,
    streetName,
    postalCode,
    shippingAddressIds,
    billingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId,
    onClickDelete,
    onClickEdit,
    onChangeDefault,
  } = props;

  const isShipping = shippingAddressIds?.includes(id!);
  const isBilling = billingAddressIds?.includes(id!);

  let inputName = '';
  if (isShipping) inputName = 'shipping';
  if (isBilling) inputName = 'billing';
  if (isShipping && isBilling) {
    if (id === defaultShippingAddressId) inputName = 'shipping';
    if (id === defaultBillingAddressId) inputName = 'billing';

    if (
      (id === defaultShippingAddressId && id === defaultBillingAddressId) ||
      (id !== defaultShippingAddressId && id !== defaultBillingAddressId)
    )
      inputName = 'shipping/billing';
  }

  function handleChangeDefault(e: ChangeEvent<HTMLInputElement>) {
    if (onChangeDefault) onChangeDefault(e.target.id);
  }

  return (
    <li className={styles.card} data-address-id={id}>
      {isShipping && !isBilling && <span>Shipping Address:</span>}
      {isBilling && !isShipping && <span>Billing Address:</span>}
      {isBilling && isShipping && <span>Shipping/Billing Address:</span>}
      <span>Country: {country}</span>
      <span>City: {city}</span>
      <span>Street Name: {streetName}</span>
      <span>Postal Code: {postalCode}</span>
      <label htmlFor={id}>
        <input
          type="radio"
          onChange={handleChangeDefault}
          checked={id === defaultShippingAddressId || id === defaultBillingAddressId}
          name={inputName}
          id={id}
        />
        {id === defaultShippingAddressId || id === defaultBillingAddressId ? '' : 'Set as '}Default{' '}
        {inputName}
      </label>
      <div className={styles.controls}>
        <Button onClick={onClickDelete} styleClass="red-outlined-small">
          Delete
        </Button>
        <Button onClick={onClickEdit} styleClass="green-outlined-small">
          Edit
        </Button>
      </div>
    </li>
  );
}
