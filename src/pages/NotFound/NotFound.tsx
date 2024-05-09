import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import { ROUTE_PATH } from '../../utils/globalVariables';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <p className={styles.header1}>Page not found</p>
        <p className={styles.header2}>Sorry, but the page that you requested does not exist</p>
        <Link to={ROUTE_PATH.main}>
          <button type="button" className={styles.button}>
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
