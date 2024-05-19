import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './Catalog.module.css';
import ProductCard from '../Products/Product';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { loadAllProducts } from '../../store/reducers/productListReducers';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import Overlay from '../Modal/Overlay';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../Modal/ModalConfirm';
import { setUserError } from '../../store/slices/userSlice';

const productsOnMainPage: number = 8;

export default function Catalog() {
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(loadAllProducts());
  }, [dispatch]);

  const { allProducts, isLoading, errorMsg } = useStoreSelector((state) => state.productList);
  return (
    <div className={styles.catalog} id="catalog">
      <div className={styles.wrapper}>
        <p className={styles['catalog-header']}>Catalog</p>
        <div className={styles.furniture}>
          {allProducts.slice(0, productsOnMainPage).map((product: ProductProjection) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {(isLoading || errorMsg !== '') && (
            <Overlay>
              {isLoading && <LoadingSpinner />}
              {errorMsg && (
                <ModalConfirm
                  message={errorMsg}
                  isError
                  onConfirm={() => dispatch(setUserError(''))}
                />
              )}
            </Overlay>
          )}
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
