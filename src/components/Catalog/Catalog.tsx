import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Button } from 'antd';
import styles from './Catalog.module.css';
import { PRODUCT_DEFAULT_FETCH_LIMIT, ROUTE_PATH } from '../../utils/globalVariables';
import { useStoreSelector } from '../../hooks/userRedux';
import useAsync from '../../hooks/useAsync';
import { getProductCategoriesMap } from '../../api/products';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Filters from './Filters/Filters';
import Sorting from './Sorting/Sorting';
import Searching from './Searching/Searching';
import { doSearchRequest, getID, RequestParams } from '../../api/doProductSearchRequest';
import ProductCard from '../Products/ProductCard';
import ModalAlert from '../Modal/ModalAlert';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import debug from '../../utils/debug';

const useLazyLoading = (
  requestParams: RequestParams,
): [ProductProjection[], boolean, Error | undefined, () => void, boolean] => {
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProductProjection[]>([]);
  const [thatsAll, setThatsAll] = useState(false);
  requestParams.limit = PRODUCT_DEFAULT_FETCH_LIMIT;
  const updateDependencies = [
    requestParams.routeParams,
    requestParams.searchParams,
    requestParams.searchRequest.value,
    requestParams.sortParams,
  ];
  const loadNext = () => {
    if (offset < total) {
      setOffset((prev) => {
        if (prev + PRODUCT_DEFAULT_FETCH_LIMIT <= total) return prev + PRODUCT_DEFAULT_FETCH_LIMIT;
        return prev + total - prev;
      });
    } else {
      setThatsAll(true);
    }
  };
  requestParams.offset = offset;
  // effect below for reset params to default
  useEffect(() => {
    setResults([]);
    setOffset(0);
    setThatsAll(false);
  }, updateDependencies);
  useEffect(() => {
    setIsLoading(true);
    doSearchRequest(requestParams)
      .then((response) => {
        // debug.log(response);
        if (response.total) {
          setTotal(response.total);
          if (response.total === response.count || response.count < PRODUCT_DEFAULT_FETCH_LIMIT) {
            setThatsAll(true);
          }
        } else {
          debug.error(`didn't got "total" field`);
        }
        setResults((prev) => {
          prev.splice(offset, response.count, ...response.results);
          return prev;
        });
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error('unknown error while loading products'));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [...updateDependencies, offset]);
  return [results, isLoading, error, loadNext, thatsAll];
};

export default function Catalog() {
  const defaultCategoryName = 'All categories';
  const [currentCategory, setCurrentCategory] = useState('Catalog');
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortParams, setSortParams] = useState('');
  const [searchText, setSearchText] = useState('');
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  const [allProductsResponse, isLoading, err, loadNext, thatsAll] = useLazyLoading({
    routeParams,
    searchParams,
    sortParams,
    searchRequest: { locale, value: searchText },
  });
  const [categoriesMap] = useAsync(getProductCategoriesMap, undefined, []);
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
        <Breadcrumbs categoriesMap={categoriesMap} className={styles.breadcrumbs} />
        <p className={styles['catalog-header']}>{currentCategory}</p>
        <Filters />
        <Sorting setSortParams={setSortParams} />
        <Searching setSearchText={setSearchText} loading={isLoading} />
        <div className={styles.furniture}>
          {err && (
            <ModalAlert
              message={err.message}
              onConfirm={() => {
                navigate(ROUTE_PATH.main);
              }}
              isError
            />
          )}
          {allProductsResponse.map((product) => (
            <ProductCard key={product.id} product={product} isPreview />
          ))}
        </div>
        <section className={styles['after-cards']}>
          {isLoading && <LoadingSpinner />}
          <Button onClick={loadNext} disabled={isLoading || thatsAll} type="primary">
            {thatsAll ? 'No more with this criteria' : 'Load more'}
          </Button>
        </section>
      </div>
    </div>
  );
}
