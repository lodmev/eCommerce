import styles from './Button.module.css';

type Props = {
  onClick?: () => void;
  type?: 'submit' | 'button';
  children?: React.ReactNode;
  disabled?: boolean;
  styleClass:
    | 'green-filled'
    | 'green-outlined'
    | 'red-outlined'
    | 'green-outlined-small'
    | 'red-outlined-small';
};

export default function Button(props: Props) {
  const { onClick, disabled, styleClass, type = 'button', children } = props;

  if (type === 'button') {
    return (
      <button
        disabled={disabled}
        className={`${styles.button} ${styles[styleClass]}`}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${styles[styleClass]}`}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
