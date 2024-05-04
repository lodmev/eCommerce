import { FormEvent } from 'react';
import Button from '../../components/Button/Button';
import FormRegistration from '../../components/FormRegistration/FormRegistration';
import Input from '../../components/Input/Input';
import useValidateInput from '../../hooks/useValidateInput';
import { validateEmail, validateName, validatePassword } from '../../utils/functions';

export default function Registration() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const {
    value: emailInputValue,
    // isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidateInput(validateEmail);

  const {
    value: passwordInputValue,
    // isValid: passwordIsValid,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
  } = useValidateInput(validatePassword);

  const {
    value: firstNameInputValue,
    // isValid: firstNameIsValid,
    hasError: firstNameHasError,
    inputBlurHandler: firstNameBlurHandler,
    valueChangeHandler: firstNameChangeHandler,
  } = useValidateInput(validateName);

  const {
    value: lastNameInputValue,
    // isValid: lastNameIsValid,
    hasError: lastNameHasError,
    inputBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
  } = useValidateInput(validateName);

  return (
    <div>
      <FormRegistration onSumbit={handleSubmit}>
        <Input
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={emailInputValue}
          invalid={emailHasError}
          type="email"
          placeholder="Email"
          errorText="Invalid email address"
        />
        <Input
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          value={passwordInputValue}
          invalid={passwordHasError}
          type="password"
          placeholder="Password"
          errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
        />
        <Input
          onBlur={firstNameBlurHandler}
          onChange={firstNameChangeHandler}
          value={firstNameInputValue}
          invalid={firstNameHasError}
          type="text"
          placeholder="First Name"
          errorText="Must contain at least one character and no special characters or numbers"
        />
        <Input
          onBlur={lastNameBlurHandler}
          onChange={lastNameChangeHandler}
          value={lastNameInputValue}
          invalid={lastNameHasError}
          type="text"
          placeholder="Last Name"
          errorText="Must contain at least one character and no special characters or numbers"
        />
        <Button type="submit" styleClass="green-filled">
          Register
        </Button>
      </FormRegistration>
    </div>
  );
}
