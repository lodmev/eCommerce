import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div>
      <div className={styles['lds-roller']}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
