import { ChangeEvent, useState } from 'react';
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

export default function Input(props: Props) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const { id, onChange, label, value, onBlur, errorText, placeholder, type, invalid, disabled } =
    props;

  if (type === 'password') {
    return (
      <div className={styles.container}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <div className={styles.wrapper}>
          <input
            value={value}
            disabled={disabled}
            id={id}
            className={`${styles.input} ${invalid ? styles.invalid : ''}`}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={isVisiblePassword ? 'text' : type}
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
        />
      </div>
      {invalid && <p className={styles['error-text']}>{errorText}</p>}
    </div>
  );
}
