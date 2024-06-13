import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalAlert from './ModalAlert';
import Overlay from './Overlay';
import { ROUTE_PATH } from '../../utils/globalVariables';
import { useStoreDispatch } from '../../hooks/userRedux';
import { setUserLogout } from '../../store/slices/userSlice';

export default function Loader({
  isLoading,
  errMsg,
  errorHandler,
}: {
  isLoading: boolean;
  errMsg?: string;
  errorHandler?: () => void;
}) {
  const navigate = useNavigate();
  const dispatch = useStoreDispatch();
  const defaultHandler = () => {
    navigate(ROUTE_PATH.main);
  };
  return isLoading || errMsg ? (
    <Overlay>
      {isLoading && <LoadingSpinner />}
      {errMsg && (
        <ModalAlert
          message={`${errMsg}`}
          isError
          onConfirm={() => {
            if (errMsg.includes('token')) {
              dispatch(setUserLogout());
            }
            if (errorHandler) {
              errorHandler();
            } else defaultHandler();
          }}
        />
      )}
    </Overlay>
  ) : null;
}
