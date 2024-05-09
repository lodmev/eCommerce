import { ErrorResponse, MyCustomerDraft } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { signupUser } from '../../api/customers';
import FormRegistration from '../../components/FormRegistration/FormRegistration';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Overlay from '../../components/Modal/Overlay';

export default function Registration() {
  const [hasOverlay, setHasOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (customer: MyCustomerDraft) => {
    setHasOverlay(true);
    setIsLoading(true);

    try {
      const data = await signupUser(customer);
      /* eslint no-console: 0 */
      console.log(data);
    } catch (err) {
      const error = err as ErrorResponse;
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const handleConfirm = () => {
    setHasOverlay(false);
    setIsLoading(false);
    setErrorMessage(null);
  };

  return (
    <div>
      <FormRegistration onSumbit={handleRegister} />
      {hasOverlay && (
        <Overlay>
          {isLoading && <LoadingSpinner />}
          {errorMessage && <ModalConfirm message={errorMessage} onConfirm={handleConfirm} />}
        </Overlay>
      )}
    </div>
  );
}
