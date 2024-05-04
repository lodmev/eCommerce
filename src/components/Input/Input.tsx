import { ChangeEvent } from 'react';
import styles from './Input.module.css';

type Props = {
  type?: 'text' | 'password' | 'email' | 'date';
  placeholder?: string;
  invalid?: 'true';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: Props) {
  const { onChange, placeholder, type, invalid } = props;

  return (
    <div className={styles['input-wrapper']}>
      <input
        className={`${styles.input} ${invalid ? styles.invalid : ''}`}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
      {invalid && <p className={styles.invalid}>invalid value</p>}
    </div>
  );
}
