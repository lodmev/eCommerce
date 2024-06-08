import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

const useLazyLoading = (requestParams: RequestParams) => {
  requestParams.limit = PRODUCT_DEFAULT_FETCH_LIMIT;
  return useAsync(doSearchRequest, requestParams, [{ ...requestParams }]);
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
  const [allProductsResponse, isLoading, err] = useLazyLoading({
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
  useEffect(() => {
    debug.log(allProductsResponse);
  }, [allProductsResponse]);
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
          {allProductsResponse &&
            allProductsResponse.results.map((product) => (
              <ProductCard key={product.id} product={product} isPreview />
            ))}
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}
