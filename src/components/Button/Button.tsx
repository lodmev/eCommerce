import styles from './Button.module.css';

type Props = {
  onClick?: () => void;
  type?: 'submit' | 'button';
  children?: React.ReactNode;
  styleClass: 'green-filled' | 'green-outlined';
};

export default function Button(props: Props) {
  const { onClick, styleClass, type = 'button', children } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`${styles.button} ${styles[styleClass]}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
