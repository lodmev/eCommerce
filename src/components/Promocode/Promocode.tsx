import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import styles from './Promocode.module.css';

export default function Promocode() {
  return (
    <div className={styles.container}>
      <div className={styles.link} role="button" tabIndex={0}>
        <p className={styles.text}>Find promo code</p>
        <FontAwesomeIcon icon={faMoneyCheckDollar} className={styles.icon} />
      </div>
    </div>
  );
}
