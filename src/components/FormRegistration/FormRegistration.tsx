import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { FormEvent, useState } from 'react';
import useValidateInput from '../../hooks/useValidateInput';
import { ICustomerRegisterData } from '../../types/interfaces';
import {
  validateAge,
  validateCity,
  validateEmail,
  validateName,
  validatePassword,
  validatePostalCode,
} from '../../utils/functions';
import { COUNTRIES_OPTIONS_LIST } from '../../utils/globalVariables';
import Button from '../Button/Button';
import Input from '../Input/Input';
import SelectComponent from '../SelectComponent/SelectComponent';
import styles from './FormRegistration.module.css';

type Props = {
  onSubmit: (customer: MyCustomerDraft) => void;
};

export default function FormRegistration(props: Props) {
  const { onSubmit } = props;

  const [selectedCountry, setSelectedCountry] = useState({ value: '', label: '' });
  const [selectedBillingCountry, setSelectedBillingCountry] = useState({ value: '', label: '' });
  const [isShippingEqualBilling, setIsShippingEqualBilling] = useState(true);
  const [isDefaultShippingAndBilling, setIsDefaultShippingAndBilling] = useState(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState(false);

  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidateInput(validateEmail);

  const {
    value: passwordInputValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
  } = useValidateInput(validatePassword);

  const {
    value: firstNameInputValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    inputBlurHandler: firstNameBlurHandler,
    valueChangeHandler: firstNameChangeHandler,
  } = useValidateInput(validateName);

  const {
    value: lastNameInputValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    inputBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
  } = useValidateInput(validateName);

  const {
    value: dateInputValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    inputBlurHandler: dateBlurHandler,
    valueChangeHandler: dateChangeHandler,
  } = useValidateInput(validateAge);

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

  const {
    value: streetBillingInputValue,
    isValid: streetBillingIsValid,
    hasError: streetBillingHasError,
    inputBlurHandler: streetBillingBlurHandler,
    valueChangeHandler: streetBillingChangeHandler,
  } = useValidateInput((value: string) => value.trim().length > 0);

  const {
    value: cityBillingInputValue,
    isValid: cityBillingIsValid,
    hasError: cityBillingHasError,
    inputBlurHandler: cityBillingBlurHandler,
    valueChangeHandler: cityBillingChangeHandler,
  } = useValidateInput(validateCity);

  const {
    value: postalBillingInputValue,
    isValid: postalBillingIsValid,
    hasError: postalBillingHasError,
    inputBlurHandler: postalBillingBlurHandler,
    valueChangeHandler: postalBillingChangeHandler,
  } = useValidateInput(
    selectedBillingCountry.value ? validatePostalCode[selectedBillingCountry.value] : () => false,
  );

  const allInputs = [
    emailIsValid,
    passwordIsValid,
    firstNameIsValid,
    lastNameIsValid,
    dateIsValid,
    streetIsValid,
    cityIsValid,
    selectedCountry.value !== '',
    postalIsValid,
  ];

  const billingAddressInputs = [
    streetBillingIsValid,
    cityBillingIsValid,
    postalBillingIsValid,
    selectedBillingCountry.value !== '',
  ];

  const formIsValid = isShippingEqualBilling
    ? allInputs.every((value) => value)
    : [...allInputs, ...billingAddressInputs].every((value) => value);

  const copyShippingAddressValues = () => {
    cityBillingChangeHandler({
      target: { value: cityInputValue },
    });
    streetBillingChangeHandler({
      target: { value: streetInputValue },
    });
    postalBillingChangeHandler({
      target: { value: postalInputValue },
    });
    setSelectedBillingCountry(selectedCountry);
    cityBillingBlurHandler();
    streetBillingBlurHandler();
    postalBillingBlurHandler();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerData: ICustomerRegisterData = {
      email: emailInputValue,
      password: passwordInputValue,
      firstName: firstNameInputValue,
      lastName: lastNameInputValue,
      dateOfBirth: dateInputValue,
      addresses: [
        {
          streetName: streetInputValue,
          city: cityInputValue,
          country: selectedCountry.value,
          postalCode: postalInputValue,
        },
      ],
    };

    if (!isShippingEqualBilling) {
      customerData.addresses.push({
        streetName: streetBillingInputValue,
        city: cityBillingInputValue,
        country: selectedBillingCountry.value,
        postalCode: postalBillingInputValue,
      });
    }

    if (isDefaultShippingAndBilling && isShippingEqualBilling) {
      customerData.defaultBillingAddress = 0;
      customerData.defaultShippingAddress = 0;
    }

    if (isDefaultShippingAndBilling && !isShippingEqualBilling) {
      customerData.defaultShippingAddress = 0;
    }

    if (isDefaultBilling && !isShippingEqualBilling) {
      customerData.defaultBillingAddress = 1;
    }

    onSubmit(customerData);
  };

  return (
    <form className={styles['form-registration']} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>Registration</h1>
      <Input
        onBlur={emailBlurHandler}
        onChange={emailChangeHandler}
        value={emailInputValue}
        invalid={emailHasError}
        id="email"
        label="Your Email"
        type="email"
        placeholder="Email"
        errorText="Invalid email address"
      />
      <Input
        onBlur={passwordBlurHandler}
        onChange={passwordChangeHandler}
        value={passwordInputValue}
        invalid={passwordHasError}
        id="password"
        label="Your password"
        type="password"
        placeholder="Password"
        errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and must not contain leading or trailing whitespace."
      />
      <div className={styles['input-group']}>
        <Input
          onBlur={firstNameBlurHandler}
          onChange={firstNameChangeHandler}
          value={firstNameInputValue}
          invalid={firstNameHasError}
          id="firstName"
          label="Your first name"
          type="text"
          placeholder="First Name"
          errorText="Must contain at least one character and no special characters or numbers"
        />
        <Input
          onBlur={lastNameBlurHandler}
          onChange={lastNameChangeHandler}
          value={lastNameInputValue}
          invalid={lastNameHasError}
          id="lastName"
          label="Your last name"
          type="text"
          placeholder="Last Name"
          errorText="Must contain at least one character and no special characters or numbers"
        />
      </div>
      <Input
        onBlur={dateBlurHandler}
        onChange={dateChangeHandler}
        value={dateInputValue}
        invalid={dateHasError}
        id="dateOfBirth"
        label="Your date of birth"
        type="date"
        errorText="Must be older than 13 years"
      />
      <fieldset className={styles.fieldset}>
        <legend>Address for shipping {isShippingEqualBilling && <span>and billing</span>}</legend>
        <div className={styles['input-group']}>
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
        </div>
        <div className={styles['input-group']}>
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
        </div>
        <label htmlFor="default-shiping-billing">
          <input
            type="checkbox"
            id="default-shiping-billing"
            checked={isDefaultShippingAndBilling}
            onChange={() => setIsDefaultShippingAndBilling((prev) => !prev)}
          />
          Set as default
        </label>
        {/* тут должен быть чекбокс set as default и если он выбран, то первый адрес становиться дефолтным для шипинг и для билинг. Или только для шипинг если снизу ещё один адрес будет */}
      </fieldset>
      <div>
        <label htmlFor="shiping-billing-address">
          <input
            checked={isShippingEqualBilling}
            onChange={() =>
              setIsShippingEqualBilling((prev) => {
                if (prev) {
                  copyShippingAddressValues();
                }
                return !prev;
              })
            }
            type="checkbox"
            id="shiping-billing-address"
          />
          Same address for shipping and billing
        </label>
      </div>
      {!isShippingEqualBilling && ( // ну тут ты понял что is NOT shipping === billing, тогда отрисовываем
        <fieldset className={styles.fieldset}>
          <legend>Address for billing</legend>
          <div className={styles['input-group']}>
            <SelectComponent
              onChange={(value) => {
                if (value) setSelectedBillingCountry(value);
              }}
              options={COUNTRIES_OPTIONS_LIST}
              value={selectedBillingCountry}
            />
            <Input
              onBlur={postalBillingBlurHandler}
              onChange={postalBillingChangeHandler}
              value={postalBillingInputValue}
              invalid={postalBillingHasError}
              id="postal2"
              label="Postal"
              placeholder="Postal Code"
              type="text"
              errorText="Must follow the format for selected country"
            />
          </div>
          <div className={styles['input-group']}>
            <Input
              onBlur={streetBillingBlurHandler}
              onChange={streetBillingChangeHandler}
              value={streetBillingInputValue}
              invalid={streetBillingHasError}
              id="street2"
              placeholder="Your Street"
              label="Street"
              type="text"
              errorText="Must contain at least one character"
            />
            <Input
              onBlur={cityBillingBlurHandler}
              onChange={cityBillingChangeHandler}
              value={cityBillingInputValue}
              invalid={cityBillingHasError}
              id="city2"
              label="City"
              placeholder="Your City"
              type="text"
              errorText="Must contain at least one character and no special characters or numbers"
            />
          </div>
          <label htmlFor="default-billing">
            <input
              type="checkbox"
              id="default-billing"
              checked={isDefaultBilling}
              onChange={() => setIsDefaultBilling((prev) => !prev)}
            />
            Set as default
          </label>
        </fieldset>
      )}
      <Button disabled={!formIsValid} type="submit" styleClass="green-filled">
        Register
      </Button>
    </form>
  );
}
