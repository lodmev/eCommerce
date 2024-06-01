import { ProductProjection } from '@commercetools/platform-sdk';
import { useState } from 'react';
import styles from './ProductInBusket.module.css';
import Quantity from '../Quantity/Quantity';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import { PriceHelper } from '../../utils/priceHelper';
import { setProductQuantity } from '../../store/slices/basketSlice';

type Props = {
  product: ProductProjection;
  quantity: number;
};
export default function ProductInBasket({ product, quantity }: Props) {
  const { name, masterVariant } = product;
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  const image = masterVariant.images?.[0];
  const imageUrl = image && image.url;
  const priceHelper = new PriceHelper({ price: masterVariant.prices![0] });
  const { priceValue } = priceHelper;
  const dispatch = useStoreDispatch();

  const [totalPrice, setTotalPrice] = useState<number>(calculateTotalPrice(+priceValue, quantity));

  function handleQuantityUpdate(quantity: number): void {
    setTotalPrice(calculateTotalPrice(+priceValue, quantity));
    dispatch(setProductQuantity({ id: product.id, quantity }));
  }

  function calculateTotalPrice(priceValue: number, quantity: number): number {
    return priceValue * quantity;
  }

  return (
    <div className={styles.product}>
      <img src={imageUrl} className={styles.img} alt="product" />
      <p className={styles.name}>{name[locale]}</p>
      <p className={styles.price}>
        {priceValue} {priceHelper.currency}
      </p>
      <Quantity initValue={quantity} outputCallback={handleQuantityUpdate} />
      <p className={styles.total}>
        {totalPrice} {priceHelper.currency}
      </p>
    </div>
  );
}
