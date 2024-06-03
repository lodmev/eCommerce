import { ProductProjection } from '@commercetools/platform-sdk';
import { Link, Params, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Catalog.module.css';
import ProductCard from '../Products/ProductCard';
import {
  CATALOG_PREVIEW_LIMIT,
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
import Sorting from './Sorting/Sorting';
// import debug from '../../utils/debug';

type RouteParams = Readonly<Params<string>>;
type RequestParams = {
  routeParams?: RouteParams;
  searchParams: URLSearchParams;
  sortParams: string;
};

function ProductCards({
  isPreview,
  products,
}: {
  products?: ProductProjection[];
  isPreview?: boolean;
}) {
  let allProducts: ProductProjection[] | undefined;
  if (products) {
    if (isPreview) {
      allProducts = products.slice(0, CATALOG_PREVIEW_LIMIT);
    } else {
      allProducts = products;
    }
  }
  return allProducts
    ? allProducts.map((product: ProductProjection) => (
        <ProductCard key={product.id} product={product} isPreview={isPreview} />
      ))
    : null;
}
const getID = (routeParams?: RouteParams) => routeParams?.subCatID || routeParams?.catID || '';

const appendFilters = ({
  locationParams,
  queryArgs,
}: {
  locationParams: Omit<RequestParams, 'sortParams'>;
  queryArgs: QueryArgs;
}) => {
  const id: string = getID(locationParams.routeParams);
  if (!id && locationParams.searchParams.size === 0) {
    return queryArgs;
  }

  const filterQuery: string[] = [];
  queryArgs['filter.query'] = filterQuery;

  if (id) {
    filterQuery.push(`categories.id:"${id}"`);
  }
  // const priceRange = locationParams.searchParams.get('f_price');
  locationParams.searchParams.forEach((value, key) => {
    if (key.startsWith('f_')) filterQuery.push(value);
  });
  return queryArgs;
};

const getQuery = ({ routeParams, searchParams, sortParams }: RequestParams): QueryArgs => {
  const queryArgs: QueryArgs = {
    limit: PRODUCT_DEFAULT_FETCH_LIMIT,
  };
  appendFilters({ locationParams: { routeParams, searchParams }, queryArgs });
  if (sortParams === '') {
    queryArgs.sort = [`score asc`];
  } else {
    queryArgs.sort = [sortParams];
  }
  queryArgs.sort.push('id asc');
  return queryArgs;
};

const doSearchRequest = async ({ routeParams, searchParams, sortParams }: RequestParams) => {
  const query = getQuery({ routeParams, searchParams, sortParams });
  return searchProducts(query);
};

export default function Catalog({ isPreview }: { isPreview?: boolean }) {
  const defaultCategoryName = 'All categories';
  const [currentCategory, setCurrentCategory] = useState('Catalog');
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortParams, setSortParams] = useState('');
  const [allProductsResponse, isLoading, err] = useAsync(
    doSearchRequest,
    { routeParams, searchParams, sortParams },
    [routeParams, sortParams],
  );
  const [categoriesMap] = useAsync(getProductCategoriesMap, undefined, []);
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
        {!isPreview && <Breadcrumbs className={styles.breadcrumbs} />}
        <p className={styles['catalog-header']}>
          {!isPreview ? currentCategory : 'The most popular'}
        </p>
        {!isPreview && <Filters />}
        {!isPreview && <Sorting setSortParams={setSortParams} />}
        <div className={styles.furniture}>
          {isLoading || err ? (
            <Loader
              isLoading={isLoading}
              errMsg={err?.name}
              errorHandler={() => {
                navigate(ROUTE_PATH.main);
              }}
            />
          ) : (
            <ProductCards products={allProductsResponse?.results} isPreview={isPreview} />
          )}
        </div>
        {isPreview && (
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
