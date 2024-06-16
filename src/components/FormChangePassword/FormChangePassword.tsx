import { FormEvent, useState } from 'react';
import useValidateInput from '../../hooks/useValidateInput';
import { validatePassword } from '../../utils/functions';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Overlay from '../Modal/Overlay';
import styles from './FormChangePassword.module.css';

type Props = {
  onChangePassword: (currentPassword: string, newPassword: string) => void;
  onCancel: () => void;
};

export default function FormChangePassword({ onChangePassword, onCancel }: Props) {
  const [isNewPasswordFieldsCorrect, setIsNewPasswordFieldsCorrect] = useState(true);

  const {
    value: currentPasswordInputValue,
    isValid: currentPasswordIsValid,
    hasError: currentPasswordHasError,
    inputBlurHandler: currentPasswordBlurHandler,
    valueChangeHandler: currentPasswordChangeHandler,
    reset: currentPasswordReset,
  } = useValidateInput(validatePassword);

  const {
    value: newPasswordInputValue,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    inputBlurHandler: newPasswordBlurHandler,
    valueChangeHandler: newPasswordChangeHandler,
    reset: newPasswordReset,
  } = useValidateInput(validatePassword);

  const {
    value: confirmNewPasswordInputValue,
    isValid: confirmNewPasswordIsValid,
    hasError: confirmNewPasswordHasError,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    valueChangeHandler: confirmNewPasswordChangeHandler,
    reset: confirmNewPasswordReset,
  } = useValidateInput(validatePassword);

  function handleChangePassword(e: FormEvent) {
    e.preventDefault();

    const isNewPasswordConfirmed = newPasswordInputValue === confirmNewPasswordInputValue;
    currentPasswordBlurHandler();
    newPasswordBlurHandler();
    confirmNewPasswordBlurHandler();

    const isAllInputsCorrect = [
      isNewPasswordConfirmed,
      currentPasswordIsValid,
      newPasswordIsValid,
      confirmNewPasswordIsValid,
    ].every((val) => val);

    setIsNewPasswordFieldsCorrect(isNewPasswordConfirmed);

    if (!isAllInputsCorrect) return;

    onChangePassword(currentPasswordInputValue, newPasswordInputValue);

    currentPasswordReset();
    newPasswordReset();
    confirmNewPasswordReset();
  }

  return (
    <Overlay>
      <form onSubmit={handleChangePassword} className={styles['modal-password']}>
        <h2>Change password</h2>
        <Input
          onBlur={currentPasswordBlurHandler}
          onChange={currentPasswordChangeHandler}
          value={currentPasswordInputValue}
          invalid={currentPasswordHasError}
          id="currentPassword"
          label="Your current password"
          type="password"
          placeholder="Current Password"
          errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and must not contain leading or trailing whitespace."
        />
        <fieldset className={styles['new-password-fieldset']}>
          <legend>New Password</legend>
          <Input
            onBlur={newPasswordBlurHandler}
            onChange={newPasswordChangeHandler}
            value={newPasswordInputValue}
            invalid={newPasswordHasError}
            id="newPassword"
            label="Your new password"
            type="password"
            placeholder="New Password"
            errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and must not contain leading or trailing whitespace."
          />
          <Input
            onBlur={confirmNewPasswordBlurHandler}
            onChange={confirmNewPasswordChangeHandler}
            value={confirmNewPasswordInputValue}
            invalid={confirmNewPasswordHasError}
            id="confirmNewPassword"
            label="Confirm your new password"
            type="password"
            placeholder="Confirm New Password"
            errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and must not contain leading or trailing whitespace."
          />
          {!isNewPasswordFieldsCorrect && (
            <p className={styles['error-msg']}>Passwords does not match</p>
          )}
        </fieldset>
        <div className={styles['modal-buttons']}>
          <Button
            type="button"
            onClick={() => {
              onCancel();
              setIsNewPasswordFieldsCorrect(true);
              currentPasswordReset();
              newPasswordReset();
              confirmNewPasswordReset();
            }}
            styleClass="red-outlined"
          >
            Cancel
          </Button>
          <Button type="submit" styleClass="green-outlined">
            Confirm
          </Button>
        </div>
      </form>
    </Overlay>
  );
}
