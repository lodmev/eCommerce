import { ProductProjection } from '@commercetools/platform-sdk';
import { Link, Params, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Catalog.module.css';
import ProductCard from '../Products/ProductCard';
import { PRODUCT_DEFAULT_FETCH_LIMIT, ROUTE_PATH } from '../../utils/globalVariables';
import { useStoreSelector } from '../../hooks/userRedux';
import Overlay from '../Modal/Overlay';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../Modal/ModalConfirm';
import useAsync from '../../hooks/useAsync';
import { getProductCategoriesMap, searchProducts } from '../../api/products';
import { SearchProductsQuery } from '../../types/types';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
// import debug from '../../utils/debug';

const getID = (params?: Readonly<Params<string>>) => params?.subCatID || params?.catID || '';

const findProducts = async (params?: Readonly<Params<string>>) => {
  const id: string = getID(params);
  const queryArgs: { filter?: string | string[]; limit: number } = {
    limit: PRODUCT_DEFAULT_FETCH_LIMIT,
  };
  if (id) {
    queryArgs.filter = `categories.id:"${id}"`;
  }

  const searchQuery: SearchProductsQuery = { queryArgs };
  return searchProducts(searchQuery);
};

export default function Catalog({ withLink }: { withLink?: boolean }) {
  const defaultCategoryName = 'All categories';
  const [currentCategory, setCurrentCategory] = useState(defaultCategoryName);
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
            <Overlay>
              {isLoading && <LoadingSpinner />}
              {err && (
                <ModalConfirm
                  message={`${err.name}`}
                  isError
                  onConfirm={() => {
                    setNeedUpdate((prev) => !prev);
                  }}
                />
              )}
            </Overlay>
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
