import { useState } from 'react';
import FormRegistration from '../../components/FormRegistration/FormRegistration';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Overlay from '../../components/Modal/Overlay';

export default function Registration() {
  const [isLoading, setIsLoading] = useState(true);
  const handleRegister = async () => {
    setIsLoading(true);
    // console.log(customer);
  };

  return (
    <div>
      <FormRegistration onSumbit={handleRegister} />
      {isLoading && (
        <Overlay>
          <LoadingSpinner />
        </Overlay>
      )}
    </div>
  );
}
