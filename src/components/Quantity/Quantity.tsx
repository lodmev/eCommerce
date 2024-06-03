import { useState } from 'react';
import styles from './Quantity.module.css';

type Props = {
  outputCallback: (data: number) => void;
  initValue: number;
};

export default function Quantity({ outputCallback, initValue }: Props) {
  const [quantity, setQuantity] = useState(initValue);

  function increment(): void {
    const newQuantity: number = quantity + 1;
    setQuantity(newQuantity);
    outputCallback(newQuantity);
  }

  function decrement(): void {
    const newQuantity: number = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    outputCallback(newQuantity);
  }

  return (
    <div className={styles['quantity-input']}>
      <button
        type="submit"
        className={`${styles['quantity-input__modifier']} ${styles['quantity-input__modifier--left']}`}
        onClick={decrement}
      >
        &mdash;
      </button>
      <input className={styles['quantity-input__screen']} type="text" value={quantity} readOnly />
      <button
        type="submit"
        className={`${styles['quantity-input__modifier']} ${styles['quantity-input__modifier--right']}`}
        onClick={increment}
      >
        &#xff0b;
      </button>
    </div>
  );
}
