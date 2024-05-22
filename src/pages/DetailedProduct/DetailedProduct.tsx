import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProductById } from '../../api/products';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './DetailedProduct.module.css';
import { priceConverter } from '../../utils/functions';
import { useStoreSelector } from '../../hooks/userRedux';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import ButtonCart from '../../components/Button/ButtonCart';

export default function DetailedProduct() {
  const { userLanguage } = useStoreSelector((state) => state.userData);
  const { id } = useParams();
  const [productProjection, setProductProjection] = useState({} as ProductProjection);
  useEffect(() => {
    getProductById(id!).then((product) => setProductProjection(product));
  }, []);
  const price = productProjection?.masterVariant?.prices?.[0];
  const amount = priceConverter(price?.value?.centAmount);
  const finalPrice = amount * 0.8;
  const images = productProjection?.masterVariant?.images;

  return (
    <div className={styles.wrapper}>
      {!productProjection ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles.description}>
            {images && <ImageCarousel images={images!} />}
            <p className={styles.text}>
              All handmade from natural wood, HHFurniture is crafted for your comfort and enjoyment.
            </p>
            <div className={styles.shipping}>
              <FontAwesomeIcon icon={faTruck} />
              <p className={styles.text}>Free shipping</p>
            </div>
          </div>

          <div className={styles.info}>
            <p className={styles.name}>{productProjection?.name?.[userLanguage]}</p>
            <p className={styles.price}>Price: {amount} euro</p>
            <p className={styles.sale}>Sale: 20%</p>
            <p className={styles['final-price']}>Final price: {finalPrice} euro</p>
            <p className={styles['product-description']}>
              Product description:
              {productProjection?.description?.[userLanguage]}
            </p>
            <div className={styles.button}>
              <ButtonCart text="+ Add to cart" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
