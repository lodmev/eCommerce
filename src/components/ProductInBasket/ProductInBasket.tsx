import { ProductProjection } from '@commercetools/platform-sdk';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductInBusket.module.css';
import Quantity from '../Quantity/Quantity';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import { PriceHelper } from '../../utils/priceHelper';
import {
  calculateTotalPrice,
  removeProductQuantity,
  setProductQuantity,
} from '../../store/slices/basketSlice';

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
  const { finalPriceValue } = priceHelper;
  const dispatch = useStoreDispatch();

  const totalPrice = calculateTotalPrice(+finalPriceValue, quantity);

  function handleQuantityUpdate(quantity: number): void {
    dispatch(setProductQuantity({ id: product.id, quantity }));
  }

  function onDeleteClick(): void {
    dispatch(removeProductQuantity(product.id));
  }

  return (
    <div className={styles.product}>
      <img src={imageUrl} className={styles.img} alt="product" />
      <div className={styles.content}>
        <p className={styles.name}>{name[locale]}</p>
        <p className={styles.price}>
          {finalPriceValue} {priceHelper.currency}
        </p>
        <Quantity initValue={quantity} outputCallback={handleQuantityUpdate} />
        <p className={styles.price}>
          {totalPrice} {priceHelper.currency}
        </p>
        <FontAwesomeIcon icon={faTrashCan} className={styles.icon} onClick={onDeleteClick} />
      </div>
    </div>
  );
}
