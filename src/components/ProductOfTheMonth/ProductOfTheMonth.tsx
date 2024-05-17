import { Link } from 'react-router-dom';
import styles from './ProductOfTheMonth.module.css';
import { ROUTE_PATH } from '../../utils/globalVariables';
import sofa from '../../assets/sofa.png';

export default function ProductOfTheMonth() {
  return (
    <div className={styles.container} id="productOfTheMonth">
      <div className={styles.wrapper}>
        <div className={styles.description}>
          <p className={styles.header1}>Discover our best product according to customers</p>
          <p className={styles.header2}>
            Customization Options: We offer unparalleled customization options, allowing you to
            tailor every aspect of your furniture to suit your unique style and preferences, from
            choice of materials to personalized finishes.
          </p>
          <p className={styles.header2}>
            Craftsmanship Excellence: Our furniture is meticulously crafted by skilled artisans who
            uphold the highest standards of quality and attention to detail, ensuring each piece is
            a masterpiece of durability and aesthetics.
          </p>
          <p className={styles.header2}>
            Sustainable Sourcing: We prioritize sustainability in our sourcing practices, using
            responsibly harvested materials and eco-friendly production methods to create furniture
            that not only enhances your home but also respects the planet.
          </p>
          <p className={styles.header2}>
            Exceptional Value: Despite the premium quality and craftsmanship of our furniture, we
            strive to offer competitive pricing, ensuring that you receive exceptional value for
            your investment in pieces that will adorn your home for years to come.
          </p>
        </div>

        <Link className={styles.product} to={ROUTE_PATH.detailedProduct}>
          <div className={styles.product}>
            <img className={styles.image} src={sofa} alt="sofa" />
          </div>
        </Link>
      </div>
      <Link className={styles.center} to={ROUTE_PATH.detailedProduct}>
        <div className={styles.link}>
          <p className={styles.text}>Read more</p>
        </div>
      </Link>
    </div>
  );
}
