import { ErrorResponse, MyCustomerDraft } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../api/customers';
import FormRegistration from '../../components/FormRegistration/FormRegistration';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Overlay from '../../components/Modal/Overlay';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { setUserLogin } from '../../store/slices/userSlice';
import { useUserDispatch } from '../../hooks/userRedux';

export default function Registration() {
  const [hasOverlay, setHasOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  // не пускать юзера на эту страницу если он не залогинен
  // const { isUserAuthorized } = useUserSelector((state) => state.userData);
  // useEffect(() => {
  //   if (isUserAuthorized) navigate(ROUTE_PATH.main);
  // }, [isUserAuthorized, navigator]);

  const hideOverlay = () => {
    setHasOverlay(false);
    setIsLoading(false);
    setErrorMessage(null);
  };

  const handleRegister = async (customer: MyCustomerDraft) => {
    setHasOverlay(true);
    setIsLoading(true);
    try {
      await signupUser(customer);
      setSuccessMessage('Your account has been successfully created!');
      dispatch(setUserLogin());

      // rou
    } catch (err) {
      const error = err as ErrorResponse;
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const handleConfirmError = () => {
    hideOverlay();
  };

  const handleConfirmSuccess = () => {
    hideOverlay();
    navigate(ROUTE_PATH.main);
  };

  return (
    <div>
      <FormRegistration onSubmit={handleRegister} />
      {hasOverlay && (
        <Overlay>
          {isLoading && <LoadingSpinner />}
          {errorMessage && (
            <ModalConfirm message={errorMessage} isError onConfirm={handleConfirmError} />
          )}
          {successMessage && (
            <ModalConfirm message={successMessage} onConfirm={handleConfirmSuccess} />
          )}
        </Overlay>
      )}
    </div>
  );
}
