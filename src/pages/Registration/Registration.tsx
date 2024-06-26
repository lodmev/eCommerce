import { ErrorResponse } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../api/customers';
import FormRegistration from '../../components/FormRegistration/FormRegistration';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Overlay from '../../components/Modal/Overlay';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { setUserId, setUserLogin, setUserVersion } from '../../store/slices/userSlice';
import { useStoreDispatch } from '../../hooks/userRedux';
import { RegisterCustomerDraft } from '../../types/types';
import ModalAlert from '../../components/Modal/ModalAlert';

export default function Registration() {
  const [hasOverlay, setHasOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useStoreDispatch();
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

  const handleRegister = async (customer: RegisterCustomerDraft) => {
    setHasOverlay(true);
    setIsLoading(true);
    try {
      const { version, id } = await signupUser(customer);
      setSuccessMessage('Your account has been successfully created!');
      dispatch(setUserLogin());
      dispatch(setUserVersion(version));
      dispatch(setUserId(id));

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
            <ModalAlert message={errorMessage} isError onConfirm={handleConfirmError} />
          )}
          {successMessage && (
            <ModalConfirm message={successMessage} onConfirm={handleConfirmSuccess} />
          )}
        </Overlay>
      )}
    </div>
  );
}
