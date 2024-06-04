import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalAlert from './ModalAlert';
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
      {errMsg && <ModalAlert message={`${errMsg}`} isError onConfirm={errorHandler} />}
    </Overlay>
  ) : null;
}
