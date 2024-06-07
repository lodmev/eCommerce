import { ProductProjection } from '@commercetools/platform-sdk';
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import styles from './ButtonCart.module.css';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import { addProduct } from '../../store/slices/basketSlice';
import { ROUTE_PATH } from '../../utils/globalVariables';

const gradient = `radial-gradient(93% 87% at 87% 89%, rgba(0, 0, 0, 0.23) 0%, transparent 86.18%),
    radial-gradient(
      66% 66% at 26% 20%,
      rgba(255, 255, 255, 0.55) 0%,
      rgba(255, 255, 255, 0) 69.79%,
      rgba(255, 255, 255, 0) 100%
    )`;

// const shouldBeDisabled = ({
//   isLoading,
//   product,
//   addedProductsIds,
// }: {
//   isLoading: boolean;
//   product: ProductProjection | undefined;
//   addedProductsIds: Record<string, number>;
// }) => {
//   if (isLoading) return true;
//   if (!product) return true;
//   if (product.id in addedProductsIds) return true;
//   return false;
// };

export default function ButtonCartAntd({ product }: { product?: ProductProjection | undefined }) {
  const { productIdToQuantity: addedProductsIds, pending: cartLoading } = useStoreSelector(
    (state) => state.basketData,
  );
  const dispatch = useStoreDispatch();
  function onButtonCartClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    e.stopPropagation();
    dispatch(addProduct(product!));
  }

  return product && product?.id in addedProductsIds ? (
    <p>
      Already in your{' '}
      <Link to={ROUTE_PATH.basket}>
        <FontAwesomeIcon icon={faCartShopping} />
      </Link>{' '}
    </p>
  ) : (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `${gradient} #54d484`,
            colorPrimaryHover: `${gradient} #98e4b4`,
            colorPrimaryActive: `${gradient} #01bc46`,
          },
        },
      }}
    >
      <Button
        // className={styles.button}
        type="primary"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        loading={cartLoading}
        // disabled={shouldBeDisabled({
        //   isLoading: cartLoading,
        //   product,
        //   addedProductsIds,
        // })}
        onClick={onButtonCartClick}
      >
        Add to cart
      </Button>
    </ConfigProvider>
  );
}
