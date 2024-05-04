import styles from './Button.module.css';

type Props = {
  onClick?: () => void;
  type?: 'submit' | 'button';
  children?: React.ReactNode;
  styleClass: 'green-filled' | 'green-outlined';
};

export default function Button(props: Props) {
  const { onClick, styleClass, type = 'button', children } = props;

  if (type === 'button') {
    return (
      <button className={`${styles.button} ${styles[styleClass]}`} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button className={`${styles.button} ${styles[styleClass]}`} type="submit" onClick={onClick}>
      {children}
    </button>
  );
}
