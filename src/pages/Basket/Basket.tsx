import { ProductProjection } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Basket.module.css';
import ProductInBasket from '../../components/ProductInBasket/ProductInBasket';
import { useStoreSelector } from '../../hooks/userRedux';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { calculateTotalPrice } from '../../store/slices/basketSlice';
import { PriceHelper } from '../../utils/priceHelper';
import { getActiveCart } from '../../api/cart';
import debug from '../../utils/debug';

export default function Basket() {
  useEffect(() => {
    getActiveCart().then(debug.log).catch(debug.error);
  }, []);
  const { productsInBasket, productIdToQuantity } = useStoreSelector((state) => state.basketData);
  let currency = '';

  const subTotalPrice = productsInBasket.reduce((subTotalPrice, product) => {
    const { id, masterVariant } = product;
    const priceHelper = new PriceHelper({ price: masterVariant.prices![0] });
    const { finalPriceValue } = priceHelper;
    currency = currency || priceHelper.currency;
    const quantity = productIdToQuantity[id];
    return subTotalPrice + calculateTotalPrice(+finalPriceValue, quantity);
  }, 0);

  return (
    <div className={styles.cart}>
      <Link className={styles.center} to={ROUTE_PATH.products}>
        <div className={styles.link}>
          <p className={styles.text}>Back To Shopping</p>
        </div>
      </Link>
      {productsInBasket.length ? (
        <div>
          {productsInBasket.map((product: ProductProjection) => (
            <ProductInBasket
              key={product.id}
              product={product}
              quantity={productIdToQuantity[product.id]}
            />
          ))}
          <div className={styles.subTotalBlock}>
            <div className={styles.subTotalPriceContent}>
              <div className={styles.subTotalPrice}>
                <p>Sub-total:</p>
                <p>
                  {subTotalPrice} {currency}
                </p>
              </div>
              <div className={styles.subTotalWarning}>
                <p>Tax and shipping cost will be calculated later</p>
              </div>
            </div>
            <Link
              aria-disabled={!subTotalPrice}
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
