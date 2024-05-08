import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './Catalog.module.css';
import ProductCard from '../Products/Product';
import { ROUTE_PATH } from '../../utils/globalVariables';

const productProjection: ProductProjection = {
  categories: [],
  name: {
    'en-US': 'VIP Comfort',
  },
  slug: {
    'en-US': 'vip-comfort',
  },
  variants: [],
  id: 'e679b176-7421-4f41-8a33-b79b705298a8',
  version: 5,
  createdAt: '2024-04-29T21:29:37.659Z',
  lastModifiedAt: '2024-05-05T12:20:38.271Z',
  productType: {
    typeId: 'product-type',
    id: 'fc6ec58b-1456-4eac-bb86-cdf11e232278',
  },
  masterVariant: {
    id: 1,
    sku: 'CP2024',
    key: 'CP2024-V1',
    prices: [
      {
        id: '0ffd9d57-f916-499e-8faa-a7990f522e5d',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 4000,
          fractionDigits: 2,
        },
        validFrom: '2024-05-04T21:00:00.000Z',
        validUntil: '2024-06-29T21:00:00.000Z',
      },
    ],
    images: [
      {
        url: 'https://source.unsplash.com/random?chair',
        dimensions: {
          w: 1080,
          h: 953,
        },
      },
    ],
    attributes: [],
    assets: [],
  },
  key: 'Comfort-CP2024',
  priceMode: 'Embedded',
};

export default function Catalog() {
  return (
    <div className={styles.catalog} id="catalog">
      <div className={styles.wrapper}>
        <p className={styles['catalog-header']}>Catalog</p>
        <div className={styles.furniture}>
          <ProductCard productProjection={productProjection} />
          <ProductCard productProjection={productProjection} />
          <ProductCard productProjection={productProjection} />
          <ProductCard productProjection={productProjection} />
          <ProductCard productProjection={productProjection} />
          <ProductCard productProjection={productProjection} />
          <ProductCard productProjection={productProjection} />
          <ProductCard productProjection={productProjection} />
        </div>
        <Link className={styles.center} to={ROUTE_PATH.catalogProduct}>
          <div className={styles.link}>
            <p className={styles.text}>Go to catalog</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
