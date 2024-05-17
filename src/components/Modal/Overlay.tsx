import styles from './Overlay.module.css';

type Props = {
  children?: React.ReactNode;
};

export default function Overlay(props: Props) {
  const { children } = props;

  return <div className={styles.overlay}>{children}</div>;
}
