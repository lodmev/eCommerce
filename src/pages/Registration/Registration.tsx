import { FormEvent } from 'react';
import Button from '../../components/Button/Button';
import FormRegistration from '../../components/FormRegistration/FormRegistration';
import Input from '../../components/Input/Input';
import useValidateInput from '../../hooks/useValidateInput';
import { validateEmail } from '../../utils/functions';

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
        <Button type="submit" styleClass="green-filled">
          Register
        </Button>
      </FormRegistration>
    </div>
  );
}
