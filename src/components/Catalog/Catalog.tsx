import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './Catalog.module.css';
import { CATALOG_PREVIEW_LIMIT, ROUTE_PATH } from '../../utils/globalVariables';
import { useStoreSelector } from '../../hooks/userRedux';
import useAsync from '../../hooks/useAsync';
import { getProductCategoriesMap } from '../../api/products';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Loader from '../Modal/Loader';
import Filters from './Filters/Filters';
import Sorting from './Sorting/Sorting';
import Searching from './Searching/Searching';
import { doSearchRequest, getID } from '../../api/doProductSearchRequest';
import ProductCard from '../Products/ProductCard';

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
export default function Catalog({ isPreview }: { isPreview?: boolean }) {
  const defaultCategoryName = 'All categories';
  const [currentCategory, setCurrentCategory] = useState('Catalog');
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortParams, setSortParams] = useState('');
  const [searchText, setSearchText] = useState('');
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  const [allProductsResponse, isLoading, err] = useAsync(
    doSearchRequest,
    { routeParams, searchParams, sortParams, searchRequest: { locale, value: searchText } },
    [routeParams, sortParams, searchText],
  );
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
        {!isPreview && <Breadcrumbs className={styles.breadcrumbs} />}
        <p className={styles['catalog-header']}>
          {!isPreview ? currentCategory : 'The most popular'}
        </p>
        {!isPreview && <Filters />}
        {!isPreview && <Sorting setSortParams={setSortParams} />}
        {!isPreview && <Searching setSearchText={setSearchText} loading={isLoading} />}
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
