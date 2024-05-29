import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import styles from './DetailedProduct.module.css';
import { useStoreSelector } from '../../hooks/userRedux';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import ButtonCart from '../../components/Button/ButtonCart';
import Price from '../../components/Price/Price';
import useAsync from '../../hooks/useAsync';
import Loader from '../../components/Modal/Loader';
import { ROUTE_PATH } from '../../utils/globalVariables';

export default function DetailedProduct() {
  const { userLanguage } = useStoreSelector((state) => state.userData);
  const { id } = useParams();
  const navigate = useNavigate();
  const [productProjection, isLoading, err] = useAsync(getProductById, id, [id]);
  const images = productProjection?.masterVariant?.images;

  return isLoading || err ? (
    <Loader
      isLoading={isLoading}
      errMsg={err?.message}
      errorHandler={() => {
        navigate(ROUTE_PATH.main);
      }}
    />
  ) : (
    <div className={styles.wrapper}>
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
        <Price price={productProjection?.masterVariant?.prices?.[0]} size="medium" />
        <p className={styles['product-description']}>
          Product description:
          {productProjection?.description?.[userLanguage]}
        </p>
        <div className={styles.button}>
          <ButtonCart text="+ Add to cart" />
        </div>
      </div>
    </div>
  );
}
