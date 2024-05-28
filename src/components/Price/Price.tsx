import { type Price as PriceType } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import styles from './Price.module.css';

export default function Price({ price }: { price?: Partial<PriceType> }) {
  const priceAmount = price?.value
    ? (price.value.centAmount / 10 ** price.value.fractionDigits).toFixed(
        price.value.fractionDigits,
      )
    : '?';
  const currency = price?.value ? price.value.currencyCode : '';
  const discount = price?.discounted ? price.discounted.value.type : '';
  return (
    priceAmount && (
      <p
        className={styles['final-price']}
        title={priceAmount === '?' ? 'Contact us' : ''}
      >{`${discount ? 'Final price:' : 'Price:'} ${priceAmount} ${currency}`}</p>
    )
  );
}
