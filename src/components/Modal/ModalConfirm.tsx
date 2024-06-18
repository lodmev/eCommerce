import Button from '../Button/Button';
import styles from './ModalConfirm.module.css';

type Props = {
  onConfirm?: () => void;
  onCancel?: () => void;
  message?: string;
  isError?: boolean;
};

export default function ModalConfirm(props: Props) {
  const { onConfirm, onCancel, message, isError = false } = props;

  const errorStyle = isError ? ` ${styles.error}` : '';

  return (
    <div className={`${styles.modal}${errorStyle}`}>
      {isError && <h3>Error</h3>}
      <p>{message}</p>
      <div className={styles.buttons}>
        {onCancel && (
          <Button onClick={onCancel} styleClass="red-outlined" type="button">
            Cancel
          </Button>
        )}
        <Button onClick={onConfirm} styleClass="green-outlined" type="button">
          OK
        </Button>
      </div>
    </div>
  );
}
