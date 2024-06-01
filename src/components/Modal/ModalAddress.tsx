import { BaseAddress } from '@commercetools/platform-sdk';
import { ChangeEvent, useState } from 'react';
import useValidateInput from '../../hooks/useValidateInput';
import { validateCity, validatePostalCode } from '../../utils/functions';
import { COUNTRIES_OPTIONS_LIST } from '../../utils/globalVariables';
import Button from '../Button/Button';
import Input from '../Input/Input';
import SelectComponent from '../SelectComponent/SelectComponent';
import styles from './ModalAddress.module.css';

type Props = {
  onCancel: () => void;
  onConfirm: (address: BaseAddress) => void;
  editingAddress: {
    id?: string;
    country?: string;
    city?: string;
    streetName?: string;
    postalCode?: string;
    isShipping?: boolean;
    isBilling?: boolean;
    isDefaultBilling?: boolean;
    isDefaultShipping?: boolean;
  };
};

export default function ModalAddress(props: Props) {
  const { onCancel, onConfirm, editingAddress } = props;

  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES_OPTIONS_LIST.filter((country) => country.value === editingAddress.country)[0] || {
      value: '',
      label: '',
    },
  );

  const [inputAddressType, setInputAddressType] = useState('shipping');

  const [isDefaultAddress, setIsDefaultAddress] = useState(
    (editingAddress.isShipping && editingAddress.isDefaultShipping) ||
      (editingAddress.isBilling && editingAddress.isDefaultBilling),
  );

  const {
    value: streetInputValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    inputBlurHandler: streetBlurHandler,
    valueChangeHandler: streetChangeHandler,
  } = useValidateInput((value: string) => value.trim().length > 0, editingAddress.streetName);

  const {
    value: cityInputValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    inputBlurHandler: cityBlurHandler,
    valueChangeHandler: cityChangeHandler,
  } = useValidateInput(validateCity, editingAddress.city);

  const {
    value: postalInputValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    inputBlurHandler: postalBlurHandler,
    valueChangeHandler: postalChangeHandler,
  } = useValidateInput(
    selectedCountry.value ? validatePostalCode[selectedCountry.value] : () => false,
    editingAddress.postalCode,
  );

  function handleConfirmAddress() {
    const isAllValid = [
      streetIsValid,
      cityIsValid,
      selectedCountry.value !== '',
      postalIsValid,
    ].every((value) => value);

    if (isAllValid) {
      const addressData: BaseAddress = {
        country: selectedCountry.value,
        postalCode: postalInputValue,
        streetName: streetInputValue,
        city: cityInputValue,
      };
      // console.log('all fields are valid');
      onConfirm(addressData);
    } else {
      postalBlurHandler();
      cityBlurHandler();
      streetBlurHandler();
    }
  }

  let typeOfAddress = '';

  if (editingAddress.isShipping) {
    typeOfAddress = 'Shipping ';
  } else if (editingAddress.isBilling) {
    typeOfAddress = 'Billing ';
  } else {
    typeOfAddress = 'New ';
  }

  function handleChangeAddressType(e: ChangeEvent<HTMLInputElement>) {
    const { addressType } = e.target.dataset;
    if (addressType) setInputAddressType(addressType);
    // console.log(e.target.dataset.addressType);
  }

  return (
    <div className={styles.modal}>
      <fieldset className={styles.fieldset}>
        <legend>{typeOfAddress}Address</legend>
        {!editingAddress.isShipping && !editingAddress.isBilling && (
          <div>
            <p>Type of address</p>
            <div className={styles['radio-buttons']}>
              <label htmlFor="address-shipping">
                <input
                  type="radio"
                  name="address-type"
                  data-address-type="shipping"
                  id="address-shipping"
                  checked={inputAddressType === 'shipping'}
                  onChange={handleChangeAddressType}
                />
                Shipping
              </label>
              <label htmlFor="address-billing">
                <input
                  type="radio"
                  name="address-type"
                  data-address-type="billing"
                  id="address-billing"
                  checked={inputAddressType === 'billing'}
                  onChange={handleChangeAddressType}
                />
                Billing
              </label>
            </div>
          </div>
        )}
        <SelectComponent
          value={selectedCountry}
          onChange={(value) => {
            if (value) setSelectedCountry(value);
          }}
          options={COUNTRIES_OPTIONS_LIST}
        />
        <Input
          onBlur={postalBlurHandler}
          onChange={postalChangeHandler}
          value={postalInputValue}
          invalid={postalHasError}
          id="postal1"
          label="Postal"
          placeholder="Postal Code"
          type="text"
          errorText="Must follow the format for selected country"
        />
        <Input
          onBlur={streetBlurHandler}
          onChange={streetChangeHandler}
          value={streetInputValue}
          invalid={streetHasError}
          id="street1"
          placeholder="Your Street"
          label="Street"
          type="text"
          errorText="Must contain at least one character"
        />
        <Input
          onBlur={cityBlurHandler}
          onChange={cityChangeHandler}
          value={cityInputValue}
          invalid={cityHasError}
          id="city1"
          label="City"
          placeholder="Your City"
          type="text"
          errorText="Must contain at least one character and no special characters or numbers"
        />
        <div className={styles.checkboxes}>
          <label htmlFor="is-default-address">
            <input
              className={styles.checkbox}
              type="checkbox"
              id="is-default-address"
              checked={isDefaultAddress === true}
              onChange={() => setIsDefaultAddress((prev) => !prev)}
            />
            Set as default
          </label>
        </div>
      </fieldset>
      <div className={styles.controls}>
        <Button type="button" onClick={onCancel} styleClass="red-outlined">
          Cancel
        </Button>
        <Button type="button" onClick={() => handleConfirmAddress()} styleClass="green-outlined">
          Confirm
        </Button>
      </div>
    </div>
  );
}
