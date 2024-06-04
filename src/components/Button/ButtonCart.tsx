import styles from './ButtonCart.module.css';

type Props = {
  text: string;
  onClick: () => void;
};

export default function ButtonCart({ text, onClick }: Props) {
  return (
    <button className={styles['button-cart']} type="button" onClick={onClick}>
      {text}
    </button>
  );
}
