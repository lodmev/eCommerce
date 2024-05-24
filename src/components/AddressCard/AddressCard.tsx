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

  return (
    <li className={styles.card}>
      {id && shippingAddressIds?.includes(id) && <span>Shipping Address:</span>}
      {id && billingAddressIds?.includes(id) && <span>Billing Address:</span>}
      <span>Country: {country}</span>
      <span>City: {city}</span>
      <span>Street Name: {streetName}</span>
      <span>Postal Code: {postalCode}</span>
      {id === defaultShippingAddressId && <span>This is Default Shipping Address</span>}
      {id === defaultBillingAddressId && <span>This is Default Billing Address</span>}
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
