import { HashLink } from 'react-router-hash-link';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './Basket.module.css';
import ProductInBasket from '../../components/ProductInBasket/ProductInBasket';
import { useStoreSelector } from '../../hooks/userRedux';

export default function Basket() {
  const { productsInBasket, productIdToQuantity } = useStoreSelector((state) => state.basketData);
  return (
    <div className={styles.cart}>
      <h2>{`You haven't added items to your cart yet`}</h2>
      {productsInBasket.map((product: ProductProjection) => (
        <ProductInBasket
          key={product.id}
          product={product}
          quantity={productIdToQuantity[product.id]}
        />
      ))}
      <HashLink to="/#catalog">Go to catalogue</HashLink>
    </div>
  );
}
