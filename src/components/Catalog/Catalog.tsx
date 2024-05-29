import { ProductProjection } from '@commercetools/platform-sdk';
import { Link, Params, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Catalog.module.css';
import ProductCard from '../Products/ProductCard';
import {
  DEFAULT_LANGUAGE_KEY,
  PRODUCT_DEFAULT_FETCH_LIMIT,
  ROUTE_PATH,
} from '../../utils/globalVariables';
import { useStoreSelector } from '../../hooks/userRedux';
import useAsync from '../../hooks/useAsync';
import { getProductCategoriesMap, searchProducts } from '../../api/products';
import { QueryArgs } from '../../types/types';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Loader from '../Modal/Loader';
// import debug from '../../utils/debug';

const getID = (params?: Readonly<Params<string>>) => params?.subCatID || params?.catID || '';

const findProducts = async (params?: Readonly<Params<string>>) => {
  const id: string = getID(params);
  const queryArgs: QueryArgs = {
    limit: PRODUCT_DEFAULT_FETCH_LIMIT,
  };
  if (id) {
    queryArgs.filter = `categories.id:"${id}"`;
  }
  if (queryArgs.sort && queryArgs.sort instanceof Array) {
    queryArgs.sort.push('"createdAt"');
  } else {
    queryArgs.sort = [`name.${DEFAULT_LANGUAGE_KEY} asc`];
  }
  return searchProducts(queryArgs);
};

export default function Catalog({ withLink }: { withLink?: boolean }) {
  const defaultCategoryName = 'All categories';
  const [currentCategory, setCurrentCategory] = useState('Catalog');
  const params = useParams();
  const [needUpdate, setNeedUpdate] = useState(false);
  const [allProductsResponse, isLoading, err] = useAsync(findProducts, params, [
    params,
    needUpdate,
  ]);
  const [categoriesMap] = useAsync(getProductCategoriesMap, undefined, [false]);
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  useEffect(() => {
    const id: string = getID(params);
    if (id && categoriesMap) {
      setCurrentCategory(categoriesMap[id].name[locale]);
    } else {
      setCurrentCategory(defaultCategoryName);
    }
  }, [params, categoriesMap]);
  return (
    <div className={styles.catalog} id="catalog">
      <div className={styles.wrapper}>
        <Breadcrumbs className={styles.breadcrumbs} />
        <p className={styles['catalog-header']}>{currentCategory}</p>
        <div className={styles.furniture}>
          {isLoading || err ? (
            <Loader
              isLoading={isLoading}
              errMsg={err?.name}
              errorHandler={() => {
                setNeedUpdate((prev) => !prev);
              }}
            />
          ) : (
            allProductsResponse &&
            allProductsResponse.results.map((product: ProductProjection) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
        {withLink && (
          <Link className={styles.center} to={ROUTE_PATH.products}>
            <div className={styles.link}>
              <p className={styles.text}>Go to catalog</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
