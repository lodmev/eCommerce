import { type Price as PriceType } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import styles from './Price.module.css';
import { PriceHelper } from '../../utils/priceHelper';

type Size = 'small' | 'medium' | 'large';

export default function Price({
  price,
  size = 'small',
}: {
  price?: Partial<PriceType>;
  size?: Size;
}) {
  const basicFontSize = () => {
    switch (size) {
      case 'small':
        return '12px';
      case 'medium':
        return '16px';
      case 'large':
        return '20px';
      default:
        return '1rem';
    }
  };
  const priceHelper = new PriceHelper({ price });
  const finalPriceText = `${priceHelper.hasDiscount ? 'Final price:' : 'Price:'} ${priceHelper.finalPriceValue} ${priceHelper.currency}`;

  return (
    <section className={styles['price-container']} style={{ fontSize: basicFontSize() }}>
      {priceHelper.hasDiscount && (
        <p
          className={styles['old-price']}
        >{`Price: ${priceHelper.priceValue} ${priceHelper.currency}`}</p>
      )}
      {priceHelper.hasDiscount && (
        <p className={styles.sale}>{`${priceHelper.discountValue}% OFF`}</p>
      )}
      <p className={styles['final-price']} title={priceHelper.hasPrice ? 'Contact us' : ''}>
        {finalPriceText}
      </p>
    </section>
  );
}
