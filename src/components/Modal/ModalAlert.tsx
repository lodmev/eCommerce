import Button from '../Button/Button';
import styles from './ModalConfirm.module.css';

type Props = {
  onConfirm?: () => void;
  message?: string;
  isError?: boolean;
};

export default function ModalAlert(props: Props) {
  const { onConfirm, message, isError = false } = props;

  const errorStyle = isError ? ` ${styles.error}` : '';

  return (
    <div className={`${styles.modal}${errorStyle}`}>
      {isError && <h3>Error</h3>}
      <p>{message}</p>
      <div>
        <Button onClick={onConfirm} styleClass="green-outlined" type="button">
          OK
        </Button>
      </div>
    </div>
  );
}
