import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProductById } from '../../api/products';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './DetailedProduct.module.css';

export default function DetailedProduct() {
  const lang = 'en-US';
  const { id } = useParams();
  const [productProjection, setProductProjection] = useState({} as ProductProjection);
  useEffect(() => {
    getProductById(id!).then((product) => setProductProjection(product));
  }, []);

  return (
    <div className={styles.wrapper}>
      {!productProjection ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles.description}>
            <img
              className={styles.image}
              src={productProjection.masterVariant.images}
              alt="Product"
            />
            <p className={styles.text}>
              All handmade from natural wood, HHFurniture is crafted for your comfort and enjoyment.
            </p>
            <div className={styles.shipping}>
              <FontAwesomeIcon icon={faTruck} />
              <p className={styles.text}>Free shipping</p>
            </div>
          </div>

          <div className={styles.info}>
            <p className={styles.name}>{productProjection.name[lang]}</p>
            <p className={styles.price}>Price</p>
            <p className={styles.sale}>Sale: 20%</p>
            <p className={styles['product-description']}>{productProjection.description[lang]}</p>
          </div>
        </>
      )}
    </div>
  );
}
