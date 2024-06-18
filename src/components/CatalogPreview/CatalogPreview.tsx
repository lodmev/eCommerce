import { Link } from 'react-router-dom';
import { useState } from 'react';
import { searchProducts } from '../../api/products';
import styles from '../Catalog/Catalog.module.css';
import useAsync from '../../hooks/useAsync';
import Loader from '../Modal/Loader';
import { CATALOG_PREVIEW_LIMIT, ROUTE_PATH } from '../../utils/globalVariables';
import ProductCard from '../Products/ProductCard';
import { QueryArgs } from '../../types/types';

export default function CatalogPreview() {
  const queryArgs: QueryArgs = {
    limit: CATALOG_PREVIEW_LIMIT,
    sort: ['score asc', 'id asc'],
  };
  const [needUpdate, setNeedUpdate] = useState(1);
  const [productsResponse, isLoading, err] = useAsync(searchProducts, queryArgs, [needUpdate]);
  return (
    <div className={styles.catalog} id="catalog">
      <div className={styles.wrapper}>
        <p className={styles['catalog-header']}>The most popular</p>
        <div className={styles.furniture}>
          {isLoading || err ? (
            <Loader
              isLoading={false}
              errMsg={err?.message}
              errorHandler={() => {
                setNeedUpdate((prev) => prev + 1);
              }}
            />
          ) : (
            productsResponse &&
            productsResponse.results.map((product) => (
              <ProductCard key={product.id} product={product} isPreview />
            ))
          )}
        </div>
        <Link className={styles.center} to={ROUTE_PATH.products}>
          <div className={styles.link}>
            <p className={styles.text}>Go to catalog</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
