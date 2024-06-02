import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalConfirm from './ModalConfirm';
import Overlay from './Overlay';

export default function Loader({
  isLoading,
  errMsg,
  errorHandler,
}: {
  isLoading: boolean;
  errMsg?: string;
  errorHandler?: () => void;
}) {
  return isLoading || errMsg ? (
    <Overlay>
      {isLoading && <LoadingSpinner />}
      {errMsg && <ModalConfirm message={`${errMsg}`} isError onConfirm={errorHandler} />}
    </Overlay>
  ) : null;
}
