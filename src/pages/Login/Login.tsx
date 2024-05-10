import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MyCustomerSignin } from '@commercetools/platform-sdk';
import FormLogin from '../../components/FormLogin/FormLogin';
import { useUserDispatch, useUserSelector } from '../../hooks/userRedux';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { loginReducer } from '../../store/reducers/userReducers';
import Overlay from '../../components/Modal/Overlay';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import { setUserError } from '../../store/slices/userSlice';

export default function Login() {
  const navigator = useNavigate();
  const { isUserAuthorized, isLoading, error } = useUserSelector((state) => state.userData);
  const dispatch = useUserDispatch();
  useEffect(() => {
    if (isUserAuthorized) navigator(ROUTE_PATH.main);
  }, [isUserAuthorized, navigator]);

  const handleLogin = (loginData: MyCustomerSignin) => {
    dispatch(loginReducer(loginData));
  };

  return (
    <div>
      <FormLogin onSubmit={handleLogin} />
      {(isLoading || error !== null) && (
        <Overlay>
          {isLoading && <LoadingSpinner />}
          {error && (
            <ModalConfirm message={error.message} onConfirm={() => dispatch(setUserError(null))} />
          )}
        </Overlay>
      )}
    </div>
  );
}
