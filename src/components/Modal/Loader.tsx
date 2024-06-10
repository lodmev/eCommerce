import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalAlert from './ModalAlert';
import Overlay from './Overlay';
import { ROUTE_PATH } from '../../utils/globalVariables';

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
  const defaultHandler = () => {
    navigate(ROUTE_PATH.main);
  };
  return isLoading || errMsg ? (
    <Overlay>
      {isLoading && <LoadingSpinner />}
      {errMsg && (
        <ModalAlert message={`${errMsg}`} isError onConfirm={errorHandler ?? defaultHandler} />
      )}
    </Overlay>
  ) : null;
}
