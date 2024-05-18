import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MyCustomerSignin } from '@commercetools/platform-sdk';
import FormLogin from '../../components/FormLogin/FormLogin';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { loginReducer } from '../../store/reducers/userReducers';
import Overlay from '../../components/Modal/Overlay';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import { setUserError } from '../../store/slices/userSlice';

export default function Login() {
  const navigator = useNavigate();
  const { isUserAuthorized, isLoading, errorMsg } = useStoreSelector((state) => state.userData);
  const dispatch = useStoreDispatch();
  useEffect(() => {
    if (isUserAuthorized) navigator(ROUTE_PATH.main);
  }, [isUserAuthorized, navigator]);

  const handleLogin = (loginData: MyCustomerSignin) => {
    dispatch(loginReducer(loginData));
  };

  return (
    <div>
      <FormLogin onSubmit={handleLogin} />
      {(isLoading || errorMsg !== '') && (
        <Overlay>
          {isLoading && <LoadingSpinner />}
          {errorMsg && (
            <ModalConfirm message={errorMsg} isError onConfirm={() => dispatch(setUserError(''))} />
          )}
        </Overlay>
      )}
    </div>
  );
}
