import { LineItem } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Basket.module.css';
import ProductInBasket from '../../components/ProductInBasket/ProductInBasket';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { fetchCartData } from '../../store/slices/basketSlice';
// import { PriceHelper } from '../../utils/priceHelper';
import Loader from '../../components/Modal/Loader';
// import debug from '../../utils/debug';

export default function Basket() {
  // const { productsInBasket, productIdToQuantity } = useStoreSelector((state) => state.basketData);
  // let currency = '';
  // const subTotalPrice = productsInBasket.reduce((subTotalPrice, product) => {
  //   const { id, masterVariant } = product;
  //   const priceHelper = new PriceHelper({ price: masterVariant.prices![0] });
  //   const { finalPriceValue } = priceHelper;
  //   currency = currency || priceHelper.currency;
  //   const quantity = productIdToQuantity[id];
  //   return subTotalPrice + calculateTotalPrice(+finalPriceValue, quantity);
  // }, 0);
  const dispatch = useStoreDispatch();
  const { cartData, pending, err } = useStoreSelector((state) => state.basketData);
  useEffect(() => {
    dispatch(fetchCartData());
  }, []);
  return (
    <div className={styles.cart}>
      <Link className={styles.center} to={ROUTE_PATH.products}>
        <div className={styles.link}>
          <p className={styles.text}>Back To Shopping</p>
        </div>
      </Link>
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
    </div>
  );
}
