import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { FormEvent, useState } from 'react';
import useValidateInput from '../../hooks/useValidateInput';
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
  const { onSubmit: onSumbit } = props;

  const [selectedCountry, setSelectedCountry] = useState({ value: '', label: '' });
  const [selectedShippingCountry, setSelectedShippingCountry] = useState({ value: '', label: '' });
  // название переменных конечно на твое усмотрение
  const [isShippingEqualBilling, setisShippingEqualBilling] = useState(true);

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
    value: streetShippingInputValue,
    isValid: streetShippingIsValid,
    hasError: streetShippingHasError,
    inputBlurHandler: streetShippingBlurHandler,
    valueChangeHandler: streetShippingChangeHandler,
  } = useValidateInput((value: string) => value.trim().length > 0);

  const {
    value: cityShippingInputValue,
    isValid: cityShippingIsValid,
    hasError: cityShippingHasError,
    inputBlurHandler: cityShippingBlurHandler,
    valueChangeHandler: cityShippingChangeHandler,
  } = useValidateInput(validateCity);

  const {
    value: postalShippingInputValue,
    isValid: postalShippingIsValid,
    hasError: postalShippingHasError,
    inputBlurHandler: postalShippingBlurHandler,
    valueChangeHandler: postalShippingChangeHandler,
  } = useValidateInput(
    selectedCountry.value ? validatePostalCode[selectedShippingCountry.value] : () => false,
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
    streetShippingIsValid,
    cityShippingIsValid,
    postalShippingIsValid,
  ];

  const formIsValid = allInputs.every((value) => value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerData: MyCustomerDraft = {
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
      defaultBillingAddress: Number(!isShippingEqualBilling),
      defaultShippingAddress: Number(!isShippingEqualBilling),
    };

    if (!isShippingEqualBilling) {
      customerData!.addresses!.push({
        streetName: streetShippingInputValue,
        city: cityShippingInputValue,
        country: selectedShippingCountry.value,
        postalCode: postalShippingInputValue,
      });
    }

    onSumbit(customerData);
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
            id="postal"
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
            id="street"
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
            id="city"
            label="City"
            placeholder="Your City"
            type="text"
            errorText="Must contain at least one character and no special characters or numbers"
          />
        </div>
        {/* тут должен быть чекбокс set as default и если он выбран, то первый адрес становиться дефолтным для шипинг и для билинг. Или только для шипинг если снизу ещё один адрес будет */}
      </fieldset>
      <div>
        <span>Same address for shipping and billing</span>
        <input
          checked={isShippingEqualBilling}
          onChange={() => setisShippingEqualBilling((prev) => !prev)}
          type="checkbox"
          id="shipping-address"
        />
      </div>
      {!isShippingEqualBilling && ( // ну тут ты понял что is NOT shipping === billing, тогда отрисовываем
        <fieldset className={styles.fieldset}>
          <legend>Address for billing</legend>
          <div className={styles['input-group']}>
            <SelectComponent
              onChange={(value) => {
                if (value) setSelectedShippingCountry(value);
              }}
              options={COUNTRIES_OPTIONS_LIST}
            />
            <Input
              onBlur={postalShippingBlurHandler}
              onChange={postalShippingChangeHandler}
              value={postalShippingInputValue}
              invalid={postalShippingHasError}
              id="postal"
              label="Postal"
              placeholder="Postal Code"
              type="text"
              errorText="Must follow the format for selected country"
            />
          </div>
          <div className={styles['input-group']}>
            <Input
              onBlur={streetShippingBlurHandler}
              onChange={streetShippingChangeHandler}
              value={streetShippingInputValue}
              invalid={streetShippingHasError}
              id="street"
              placeholder="Your Street"
              label="Street"
              type="text"
              errorText="Must contain at least one character"
            />
            <Input
              onBlur={cityShippingBlurHandler}
              onChange={cityShippingChangeHandler}
              value={cityShippingInputValue}
              invalid={cityShippingHasError}
              id="city"
              label="City"
              placeholder="Your City"
              type="text"
              errorText="Must contain at least one character and no special characters or numbers"
            />
          </div>
          {/* и тут должен быть чекбокс set ad default и если он выбран,то адрес становиться дефолтным для ТОЛЬКО для билинг */}
        </fieldset>
      )}
      <Button disabled={!formIsValid} type="submit" styleClass="green-filled">
        Register
      </Button>
    </form>
  );
}
