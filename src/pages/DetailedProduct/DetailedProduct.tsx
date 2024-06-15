import { useEffect } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import styles from './DetailedProduct.module.css';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import Price from '../../components/Price/Price';
import useAsync from '../../hooks/useAsync';
import Loader from '../../components/Modal/Loader';
import { ROUTE_PATH } from '../../utils/globalVariables';
import ButtonCart from '../../components/Button/ButtonCart';
import { fetchCartData, removeProductQuantity } from '../../store/slices/basketSlice';

export default function DetailedProduct() {
  const dispatch = useStoreDispatch();
  const { userLanguage } = useStoreSelector((state) => state.userData);

  const { cartData } = useStoreSelector((state) => state.basketData);
  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  const { productIdToQuantity: addedProductsIds, pending: cartLoading } = useStoreSelector(
    (state) => state.basketData,
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const [productProjection, isLoading, err] = useAsync(getProductById, id, [id]);
  const images = productProjection?.masterVariant?.images;

  const isProductInCart = productProjection && productProjection.id in addedProductsIds;

  function onRemoveFromCart() {
    const thisProduct = cartData?.lineItems.filter(
      (item) => item.productId === productProjection?.id,
    );

    if (thisProduct) dispatch(removeProductQuantity(thisProduct[0]));
  }

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
        <div className={styles.buttons}>
          <ButtonCart product={productProjection} />
          {isProductInCart && (
            <Button
              onClick={onRemoveFromCart}
              type="text"
              loading={cartLoading}
              icon={<FontAwesomeIcon icon={faCircleXmark} />}
            >
              Remove from cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
