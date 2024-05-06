import { FormEvent } from 'react';
import useValidateInput from '../../hooks/useValidateInput';
import {
  validateAge,
  validateCity,
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/functions';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './FormRegistration.module.css';

type Props = {
  onSumbit: () => void;
};

export default function FormRegistration(props: Props) {
  const { onSumbit } = props;

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

  const allInputs = [
    emailIsValid,
    passwordIsValid,
    firstNameIsValid,
    lastNameIsValid,
    dateIsValid,
    streetIsValid,
    cityIsValid,
  ];

  const formIsValid = allInputs.every((value) => value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const userData = {
    //   email: emailInputValue,
    //   password: passwordInputValue,
    //   firstName: firstNameInputValue,
    //   lastName: lastNameInputValue,
    //   dateOfBirth: dateInputValue,
    //   address: {
    //     street: streetInputValue,
    //     city: cityInputValue,
    //   },
    // };

    // onSumbit(userData);
    onSumbit();
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
        errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
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
        <legend>Address</legend>
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
      </fieldset>
      <Button disabled={!formIsValid} type="submit" styleClass="green-filled">
        Register
      </Button>
    </form>
  );
}
