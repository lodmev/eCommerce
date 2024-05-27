import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './Catalog.module.css';
import ProductCard from '../Products/ProductCard';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import Overlay from '../Modal/Overlay';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../Modal/ModalConfirm';
import { setUserError } from '../../store/slices/userSlice';
import useAsync from '../../hooks/useAsync';
import { getAllProducts, getProductCategoriesMap } from '../../api/products';
// import debug from '../../utils/debug';

const productsOnMainPage: number = 8;

export default function Catalog() {
  const dispatch = useStoreDispatch();
  const [currentCategory, setCurrentCategory] = useState('All categories');
  const params = useParams();
  const [allProducts, isLoading, err] = useAsync(getAllProducts, []);
  const [categoriesMap] = useAsync(getProductCategoriesMap, [false]);
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  useEffect(() => {
    const id: string = params.subCatID || params.catID || '';
    if (id && categoriesMap) {
      setCurrentCategory(categoriesMap[id].name[locale]);
    }
  }, [params]);
  return (
    <div className={styles.catalog} id="catalog">
      <div className={styles.wrapper}>
        <p className={styles['catalog-header']}>{currentCategory}</p>
        <div className={styles.furniture}>
          {isLoading || err ? (
            <Overlay>
              {isLoading && <LoadingSpinner />}
              {err && (
                <ModalConfirm
                  message={err?.message}
                  isError
                  onConfirm={() => dispatch(setUserError(''))}
                />
              )}
            </Overlay>
          ) : (
            allProducts &&
            allProducts
              .slice(0, productsOnMainPage)
              .map((product: ProductProjection) => (
                <ProductCard key={product.id} product={product} />
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
