import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './Catalog.module.css';
import ProductCard from '../Products/Product';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { useEffect } from 'react';
import { loadAllProducts } from '../../store/reducers/productListReducers.ts';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux.ts';
import Overlay from '../Modal/Overlay.tsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.tsx';
import ModalConfirm from '../Modal/ModalConfirm.tsx';
import { setUserError } from '../../store/slices/userSlice.ts';

const productsOnMainPage: number = 8;

export default function Catalog() {
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(loadAllProducts());
  }, []);

  const { allProducts, isLoading, errorMsg } = useStoreSelector((state) => state.productList);
  return (
    <div className={styles.catalog} id="catalog">
      <div className={styles.wrapper}>
        <p className={styles['catalog-header']}>Catalog</p>
        <div className={styles.furniture}>
          {
            allProducts.slice(0, productsOnMainPage).map((product: ProductProjection) => {
              return (<ProductCard product={product} />)
            })
          }
          {(isLoading || errorMsg !== '') && (
            <Overlay>
              {isLoading && <LoadingSpinner />}
              {errorMsg && (
                <ModalConfirm message={errorMsg} isError onConfirm={() => dispatch(setUserError(''))} />
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
