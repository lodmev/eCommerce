import Select, { ActionMeta, PropsValue } from 'react-select';
import styles from './SelectComponent.module.css';

type Option = {
  value: string;
  label: string;
};

type Props = {
  onChange?: (option: Option | null, actionMeta: ActionMeta<Option>) => void;
  options: {
    value: string;
    label: string;
  }[];
  value?: PropsValue<Option>;
};

export default function SelectComponent(props: Props) {
  const { options, onChange, value } = props;
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Country</span>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            minHeight: 42,
            borderColor: state.isFocused ? '#56b280' : '#898989',
          }),
        }}
        onChange={onChange}
        options={options}
        value={value}
      />
    </div>
  );
}
