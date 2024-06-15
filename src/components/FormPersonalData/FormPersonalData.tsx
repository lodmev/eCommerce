import { Customer } from '@commercetools/platform-sdk';
import { FormEvent, useState } from 'react';
import useValidateInput from '../../hooks/useValidateInput';
import { IUpdateUserInfo } from '../../types/interfaces';
import { validateAge, validateEmail, validateName } from '../../utils/functions';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './FormPersonalData.module.css';

type Props = {
  customer: Customer;
  onSubmit: (userInfo: IUpdateUserInfo) => void;
};

export default function FormPersonalData({ customer, onSubmit }: Props) {
  const [isEditUserInfo, setIsEditUserInfo] = useState(false);

  const {
    value: firstNameInputValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    inputBlurHandler: firstNameBlurHandler,
    valueChangeHandler: firstNameChangeHandler,
  } = useValidateInput(validateName, customer.firstName);

  const {
    value: lastNameInputValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    inputBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
  } = useValidateInput(validateName, customer.lastName);

  const {
    value: dateInputValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    inputBlurHandler: dateBlurHandler,
    valueChangeHandler: dateChangeHandler,
  } = useValidateInput(validateAge, customer.dateOfBirth);

  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidateInput(validateEmail, customer.email);

  function handleSumbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isEditUserInfo) return;

    const isAllValid = [emailIsValid, firstNameIsValid, lastNameIsValid, dateIsValid].every(
      (value) => value,
    );

    if (!isAllValid) return;

    const userInfo: IUpdateUserInfo = {
      email: emailInputValue,
      firstName: firstNameInputValue,
      lastName: lastNameInputValue,
      dateOfBirth: dateInputValue,
    };

    onSubmit(userInfo);
    setIsEditUserInfo(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <h1>User Profile</h1>
      <div>
        <div className={styles['input-group']}>
          <Input
            label="First Name"
            id="first-name"
            type="text"
            onBlur={firstNameBlurHandler}
            onChange={firstNameChangeHandler}
            value={firstNameInputValue}
            invalid={isEditUserInfo && firstNameHasError}
            placeholder="First Name"
            errorText="Must contain at least one character and no special characters or numbers"
            disabled={!isEditUserInfo}
          />
          <Input
            label="Last Name"
            id="last-name"
            type="text"
            onBlur={lastNameBlurHandler}
            onChange={lastNameChangeHandler}
            value={lastNameInputValue}
            invalid={isEditUserInfo && lastNameHasError}
            placeholder="Last Name"
            errorText="Must contain at least one character and no special characters or numbers"
            disabled={!isEditUserInfo}
          />
        </div>
        <Input
          type="date"
          label="Date of birth"
          onBlur={dateBlurHandler}
          onChange={dateChangeHandler}
          value={dateInputValue}
          invalid={isEditUserInfo && dateHasError}
          errorText="Must be older than 13 years"
          disabled={!isEditUserInfo}
        />
        <Input
          type="email"
          label="Current Email"
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          invalid={isEditUserInfo && emailHasError}
          value={emailInputValue}
          placeholder="Email"
          errorText="Invalid email address"
          disabled={!isEditUserInfo}
        />
        <div className={styles['input-group']}>
          <Button
            onClick={() => setIsEditUserInfo((prev) => !prev)}
            type="button"
            styleClass="green-outlined"
          >
            {isEditUserInfo ? 'Cancel editing' : 'Edit Personal Data'}
          </Button>
          <Button disabled={!isEditUserInfo} type="submit" styleClass="green-outlined">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
