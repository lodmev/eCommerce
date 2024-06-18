import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { MyCustomerSignin } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/functions';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './FormLogin.module.css';
import { ROUTE_PATH } from '../../utils/globalVariables';
// import debug from '../../utils/debug';

type Props = {
  onSubmit: (loginData: MyCustomerSignin) => void;
};

export default function FormLogin(props: Props) {
  const { onSubmit } = props;

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  // const [emailIsTouched, setEmailIsTouched] = useState(false);
  // const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  const handleChangeEmail = (email: string) => {
    setEmailValue(email);
    setEmailIsValid(validateEmail(email));
    setFormIsValid(validateEmail(email) && passwordIsValid);
  };

  const handleChangePassword = (password: string) => {
    setPasswordValue(password);
    setPasswordIsValid(validatePassword(password));
    setFormIsValid(validatePassword(password) && emailIsValid);
  };
  const loginRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (loginRef.current) loginRef.current.focus();
  }, []);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail(emailValue);
    const isPasswordValid = validatePassword(passwordValue);
    if (!isEmailValid) {
      setEmailIsValid(false);
      setFormIsValid(false);
    }

    if (!isPasswordValid) {
      setPasswordIsValid(false);
      setFormIsValid(false);
    }
    if (!isEmailValid || !isPasswordValid) return;
    const userData = {
      email: emailValue,
      password: passwordValue,
    };
    onSubmit(userData);
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles['form-login']} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Login</h1>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmail(e.target.value)}
          value={emailValue}
          invalid={!emailIsValid}
          id="email"
          label="Your Email"
          type="text"
          placeholder="Email"
          errorText="Invalid email address. Must not contain leading or trailing whitespace."
          ref={loginRef}
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePassword(e.target.value)}
          value={passwordValue}
          invalid={!passwordIsValid}
          id="password"
          label="Your password"
          type="password"
          placeholder="Password"
          errorText="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and must not contain leading or trailing whitespace."
        />
        <Button disabled={!formIsValid} type="submit" styleClass="green-filled">
          Login
        </Button>
      </form>

      <div className={styles.navigate}>
        <p className={styles.text}>Do not have an account?</p>
        <Link className={styles.link} to={ROUTE_PATH.registration}>
          <p className={styles.text}>Register</p>
        </Link>
      </div>
    </div>
  );
}
