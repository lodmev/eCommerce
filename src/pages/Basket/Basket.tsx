import { LineItem } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { faArrowLeft, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Basket.module.css';
import ProductInBasket from '../../components/ProductInBasket/ProductInBasket';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { fetchCartData, deleteCartThunk } from '../../store/slices/basketSlice';
// import { PriceHelper } from '../../utils/priceHelper';
import Loader from '../../components/Modal/Loader';
import Overlay from '../../components/Modal/Overlay';
import ModalConfirm from '../../components/Modal/ModalConfirm';
// import debug from '../../utils/debug';

const clearCartConfirmMessage: string = 'Are you sure you want to delete all items in the cart?';

export default function Basket() {
  const dispatch = useStoreDispatch();
  const { cartData, pending, err } = useStoreSelector((state) => state.basketData);
  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  const [clearCartConfirmVisible, setClearCartConfirmVisible] = useState<boolean>(false);

  function onClearAllClick(): void {
    setClearCartConfirmVisible(true);
  }

  function onClearAllConfirmed(): void {
    setClearCartConfirmVisible(false);
    dispatch(deleteCartThunk());
  }

  return (
    <div className={styles.cart}>
      <div className={styles.actions}>
        <Link className={styles.center} to={ROUTE_PATH.products}>
          <div className={styles.link}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
            <p className={styles.text}>Back To Shopping</p>
          </div>
        </Link>
        {cartData?.lineItems.length ? (
          <div className={styles.link} role="button" tabIndex={0} onClick={onClearAllClick}>
            <p className={styles.text}>Clear Cart</p>
            <FontAwesomeIcon icon={faTrashCanArrowUp} className={styles.icon} />
          </div>
        ) : (
          ''
        )}
      </div>
      <Loader isLoading={pending} errMsg={err?.message} />
      {cartData?.lineItems.length ? (
        <div>
          {cartData.lineItems.map((lineItem: LineItem) => (
            <ProductInBasket key={lineItem.id} product={lineItem} quantity={lineItem.quantity} />
          ))}
          <div className={styles.subTotalBlock}>
            <div className={styles.subTotalPriceContent}>
              <div className={styles.subTotalPrice}>
                <p>Sub-total:</p>
                <p>{cartData.totalPrice.centAmount / 100} EUR</p>
              </div>
              <div className={styles.subTotalWarning}>
                <p>Tax and shipping cost will be calculated later</p>
              </div>
            </div>
            <Link
              aria-disabled={Boolean(!cartData.totalPrice.centAmount)}
              className={`${styles.center} ${styles.checkoutLink}`}
              to={ROUTE_PATH.checkout}
            >
              <div className={styles.link}>
                <p className={styles.text}>Check-out</p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <h2>{`You haven't added items to your cart yet`}</h2>
      )}
      {clearCartConfirmVisible && (
        <Overlay>
          <ModalConfirm
            onCancel={() => {
              setClearCartConfirmVisible(false);
            }}
            onConfirm={onClearAllConfirmed}
            message={clearCartConfirmMessage}
          />
        </Overlay>
      )}
    </div>
  );
}
