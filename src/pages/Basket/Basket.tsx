import { HashLink } from 'react-router-hash-link';
import styles from './Basket.module.css';

export default function Basket() {
  return (
    <div className={styles.cart}>
      <h2>{`You haven't added items to your cart yet`}</h2>
      <HashLink to="/#catalog">Go to catalogue</HashLink>
    </div>
  );
}
