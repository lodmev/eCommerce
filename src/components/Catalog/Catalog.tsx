import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './Catalog.module.css';
import ProductCard from '../Products/ProductCard';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { loadAllProducts } from '../../store/reducers/productReducers';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import Overlay from '../Modal/Overlay';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../Modal/ModalConfirm';
import { setUserError } from '../../store/slices/userSlice';
import debug from '../../utils/debug';

const productsOnMainPage: number = 8;

export default function Catalog() {
  const dispatch = useStoreDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(loadAllProducts());
    debug.log(location.pathname.split('/')[2]);
  }, [dispatch, location]);
  const { allProducts, isLoading, errorMsg } = useStoreSelector((state) => state.productData);
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
        <Link className={styles.center} to={ROUTE_PATH.products}>
          <div className={styles.link}>
            <p className={styles.text}>Go to catalog</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
