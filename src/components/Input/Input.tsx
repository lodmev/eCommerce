import { ChangeEvent } from 'react';
import styles from './Input.module.css';

type Props = {
  type?: 'text' | 'password' | 'email' | 'date';
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: Props) {
  const { onChange, placeholder, type } = props;
  return (
    <input className={styles.input} onChange={onChange} placeholder={placeholder} type={type} />
  );
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
};
