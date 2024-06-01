import { Address } from '@commercetools/platform-sdk';
import Button from '../Button/Button';
import styles from './AddressCard.module.css';

interface Props extends Address {
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
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
  } = props;

  const isDefaultShipping = id === defaultShippingAddressId;
  const isDefaultBilling = id === defaultBillingAddressId;
  const isShipping = shippingAddressIds?.includes(id!);
  const isBilling = billingAddressIds?.includes(id!);
  const defaultInputParams = {
    name: '',
    isDefault: false,
  };

  if (isShipping) {
    defaultInputParams.name = 'shipping';
    if (isDefaultShipping) defaultInputParams.isDefault = true;
  }

  if (isBilling) {
    defaultInputParams.name = 'billing';
    if (isDefaultBilling) defaultInputParams.isDefault = true;
  }

  return (
    <li className={styles.card}>
      {isShipping && <span>Shipping Address:</span>}
      {isBilling && <span>Billing Address:</span>}
      <span>Country: {country}</span>
      <span>City: {city}</span>
      <span>Street Name: {streetName}</span>
      <span>Postal Code: {postalCode}</span>
      <label htmlFor={id}>
        <input type="radio" name={defaultInputParams.name} id={id} />
        Set as Default
      </label>
      {isDefaultShipping && <span>This is Default Shipping Address</span>}
      {isDefaultBilling && <span>This is Default Billing Address</span>}
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
