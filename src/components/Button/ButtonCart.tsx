import styles from './ButtonCart.module.css';

type Props = {
  text: string;
};

export default function ButtonCart({ text }: Props) {
  return (
    <button className={styles['button-cart']} type="button">
      {text}
    </button>
  );
}
