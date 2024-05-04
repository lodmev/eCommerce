import { ChangeEvent } from 'react';
import styles from './Input.module.css';

type Props = {
  errorText?: string;
  type?: 'text' | 'password' | 'email' | 'date';
  placeholder?: string;
  invalid?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

export default function Input(props: Props) {
  const { onChange, value, onBlur, errorText, placeholder, type, invalid } = props;

  return (
    <div className={styles['input-wrapper']}>
      <input
        value={value}
        className={`${styles.input} ${invalid ? styles.invalid : ''}`}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type}
      />
      {invalid && <p className={styles['error-text']}>{errorText}</p>}
    </div>
  );
}
