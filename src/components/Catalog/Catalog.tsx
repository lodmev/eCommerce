import { ProductProjection } from '@commercetools/platform-sdk';
import { Link, Params, useParams, useSearchParams } from 'react-router-dom';
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
import Filters from './Filters/Filters';
// import debug from '../../utils/debug';

type RouteParams = Readonly<Params<string>>;
type QueryParams = {
  routeParams?: RouteParams;
  searchParams: URLSearchParams;
};

const getID = (routeParams?: RouteParams) => routeParams?.subCatID || routeParams?.catID || '';

const getQuery = ({ routeParams, searchParams }: QueryParams): QueryArgs => {
  const id: string = getID(routeParams);
  const queryArgs: QueryArgs = {
    limit: PRODUCT_DEFAULT_FETCH_LIMIT,
  };
  if (!id && searchParams.size === 0) {
    return queryArgs;
  }

  const filterQuery: string[] = [];

  if (id) {
    filterQuery.push(`categories.id:"${id}"`);
  }
  const priceRange = searchParams.get('f_price');
  if (priceRange) {
    filterQuery.push(`variants.price.centAmount:range ${priceRange}`);
  }
  if (queryArgs.sort && queryArgs.sort instanceof Array) {
    queryArgs.sort.push('"createdAt"');
  } else {
    queryArgs.sort = [`name.${DEFAULT_LANGUAGE_KEY} asc`];
  }
  queryArgs['filter.query'] = filterQuery;
  return queryArgs;
};

const doSearchRequest = async ({ routeParams, searchParams }: QueryParams) => {
  const query = getQuery({ routeParams, searchParams });
  return searchProducts(query);
};

export default function Catalog({ withLink }: { withLink?: boolean }) {
  const defaultCategoryName = 'All categories';
  const [currentCategory, setCurrentCategory] = useState('Catalog');
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  const [needUpdate, setNeedUpdate] = useState(false);
  const [allProductsResponse, isLoading, err] = useAsync(
    doSearchRequest,
    { routeParams, searchParams },
    [routeParams, needUpdate],
  );
  const [categoriesMap] = useAsync(getProductCategoriesMap, undefined, [false]);
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  useEffect(() => {
    const id: string = getID(routeParams);
    if (id && categoriesMap) {
      setCurrentCategory(categoriesMap[id].name[locale]);
    } else {
      setCurrentCategory(defaultCategoryName);
    }
  }, [routeParams, categoriesMap]);
  return (
    <div className={styles.catalog} id="catalog">
      <div className={styles.wrapper}>
        <Breadcrumbs className={styles.breadcrumbs} />
        <p className={styles['catalog-header']}>{currentCategory}</p>
        <Filters />
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
