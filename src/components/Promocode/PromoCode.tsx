import { useState } from 'react';
import PureModal from 'react-pure-modal';
import { DiscountCode } from '@commercetools/platform-sdk';
import useAsync from '../../hooks/useAsync';
import queryDiscountCodes from '../../api/promoCodes';
import Loader from '../Modal/Loader';
import styles from './Promocode.module.css';

export default function PromoCode() {
  const [isPromoCodeModalVisible, setIsPromoCodeModalVisible] = useState<boolean>(false);
  const [needUpdate, setNeedUpdate] = useState(1);
  const [promoCodesResponse, isLoading, err] = useAsync(queryDiscountCodes, {}, [needUpdate]);

  return (
    <div className={styles.container}>
      <div
        className={styles.link}
        role="button"
        tabIndex={0}
        onClick={() => setIsPromoCodeModalVisible(true)}
      >
        <p className={styles.text}>Find promo code</p>
      </div>
      <PureModal
        width="70%"
        header="Available promo codes"
        isOpen={isPromoCodeModalVisible}
        closeButtonPosition="bottom"
        onClose={() => {
          setIsPromoCodeModalVisible(false);
          return true;
        }}
      >
        {isLoading || err ? (
          <Loader
            isLoading={false}
            errMsg={err?.message}
            errorHandler={() => {
              setNeedUpdate((prev) => prev + 1);
            }}
          />
        ) : (
          <div>
            {promoCodesResponse &&
              promoCodesResponse.results.map((discountCode: DiscountCode) => (
                <h1 className={styles['promo-code']}>{discountCode.code}</h1>
              ))}
          </div>
        )}
      </PureModal>
    </div>
  );
}
