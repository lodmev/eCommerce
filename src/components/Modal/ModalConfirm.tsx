import Button from '../Button/Button';
import styles from './ModalConfirm.module.css';

type Props = {
  onConfirm?: () => void;
  message?: string;
};

export default function ModalConfirm(props: Props) {
  const { onConfirm, message } = props;

  return (
    <div className={styles.modal}>
      <p>{message}</p>
      <Button onClick={onConfirm} styleClass="green-outlined" type="button">
        OK
      </Button>
    </div>
  );
}
