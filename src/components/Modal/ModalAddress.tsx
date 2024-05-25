import { useState } from 'react';
import useValidateInput from '../../hooks/useValidateInput';
import { validateCity, validatePostalCode } from '../../utils/functions';
import { COUNTRIES_OPTIONS_LIST } from '../../utils/globalVariables';
import Button from '../Button/Button';
import Input from '../Input/Input';
import SelectComponent from '../SelectComponent/SelectComponent';
import styles from './ModalAddress.module.css';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ModalAddress(props: Props) {
  const { onCancel, onConfirm } = props;

  const [selectedCountry, setSelectedCountry] = useState({ value: '', label: '' });
  const {
    value: streetInputValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    inputBlurHandler: streetBlurHandler,
    valueChangeHandler: streetChangeHandler,
  } = useValidateInput((value: string) => value.trim().length > 0);

  const {
    value: cityInputValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    inputBlurHandler: cityBlurHandler,
    valueChangeHandler: cityChangeHandler,
  } = useValidateInput(validateCity);

  const {
    value: postalInputValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    inputBlurHandler: postalBlurHandler,
    valueChangeHandler: postalChangeHandler,
  } = useValidateInput(
    selectedCountry.value ? validatePostalCode[selectedCountry.value] : () => false,
  );

  function handleConfirmChangeAddress() {
    const isAllValid = [
      streetIsValid,
      cityIsValid,
      selectedCountry.value !== '',
      postalIsValid,
    ].every((value) => value);

    if (isAllValid) {
      // console.log('all fields are valid');
      onConfirm();
    }
  }

  return (
    <div className={styles.modal}>
      <fieldset className={styles.fieldset}>
        <legend>Edit address</legend>
        <SelectComponent
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
        <label htmlFor="default-shipping-billing">
          <input
            className={styles.checkbox}
            type="checkbox"
            id="default-shipping-billing"
            // checked={isDefaultShippingAndBilling}
            // onChange={() => setIsDefaultShippingAndBilling((prev) => !prev)}
          />
          Set as default
        </label>
      </fieldset>
      <div className={styles.controls}>
        <Button type="button" onClick={onCancel} styleClass="red-outlined">
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => handleConfirmChangeAddress()}
          styleClass="green-outlined"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
