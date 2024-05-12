import { Link } from 'react-router-dom';
import styles from './Description.module.css';
import { ROUTE_PATH } from '../../utils/globalVariables';

export default function Description() {
  return (
    <div className={styles.container} id="about">
      <div className={styles.description}>
        <p className={styles.text}>
          Furnish Your Dreams: Explore Our Bespoke Furniture Collection!
        </p>
        <p className={styles.text}>
          Step into a world of exquisite craftsmanship and timeless elegance with our curated
          selection of bespoke furniture pieces. From luxurious sofas to artisanal dining sets,
          discover the perfect blend of style and functionality to transform your living space into
          a sanctuary of comfort and beauty.
        </p>
        <Link className={styles.center} to={ROUTE_PATH.aboutUs}>
          <div className={styles.link}>
            <p>Learn more</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
