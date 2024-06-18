import { ReactNode } from 'react';
import styles from './BasketIconWrapper.module.css';
import { useStoreSelector } from '../../../hooks/userRedux';

type Props = {
  children: ReactNode;
};

export default function BasketIconWrapper({ children }: Props) {
  const { cartData } = useStoreSelector((state) => state.basketData);
  const totalQuantity = cartData?.totalLineItemQuantity;
  return totalQuantity ? (
    <div data-quantity={cartData?.totalLineItemQuantity} className={styles['basket-icon-wrapper']}>
      {children}
    </div>
  ) : (
    children
  );
}
