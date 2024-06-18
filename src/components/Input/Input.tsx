import { ChangeEvent, forwardRef, useState } from 'react';
import { IconHide, IconShow } from '../Icons/Icons';
import styles from './Input.module.css';

type Props = {
  errorText?: string;
  type?: 'text' | 'password' | 'email' | 'date';
  placeholder?: string;
  invalid?: boolean;
  value?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const { id, onChange, label, value, onBlur, errorText, placeholder, type, invalid, disabled } =
    props;

  if (type === 'password') {
    return (
      <div className={styles.container}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <div className={`${styles.wrapper} ${disabled && styles.disabled}`}>
          <input
            value={value}
            disabled={disabled}
            id={id}
            className={`${styles.input} ${invalid ? styles.invalid : ''}`}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={isVisiblePassword ? 'text' : type}
            ref={ref}
          />
          <button
            className={styles.toggler}
            type="button"
            onKeyDown={() => {}}
            onClick={() => setIsVisiblePassword((prevValue) => !prevValue)}
          >
            {isVisiblePassword ? <IconShow /> : <IconHide />}
          </button>
        </div>
        {invalid && <p className={styles['error-text']}>{errorText}</p>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={`${styles.wrapper} ${disabled && styles.disabled}`}>
        <input
          value={value}
          disabled={disabled}
          id={id}
          className={`${styles.input} ${invalid ? styles.invalid : ''}`}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          type={isVisiblePassword ? 'text' : type}
          autoComplete={id}
          ref={ref}
        />
      </div>
      {invalid && <p className={styles['error-text']}>{errorText}</p>}
    </div>
  );
});
export default Input;
