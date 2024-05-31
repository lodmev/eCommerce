import { InputNumber, InputNumberProps, Slider, Space } from 'antd';
import styles from './Filters.module.css';

type Value = { value: number; type: 'min' | 'max' } | number[];

export default function RangeFilter({
  valuesState,
  prefix,
  suffix,
  min,
  max,
}: {
  valuesState: [number[], React.Dispatch<React.SetStateAction<number[]>>];
  prefix?: InputNumberProps<number>['prefix'];
  suffix?: InputNumberProps<number>['suffix'];
  min?: number;
  max?: number;
}) {
  const [priceRange, setPriceRange] = valuesState;
  const onChangeValue = (val: Value) => {
    if (Array.isArray(val)) {
      setPriceRange(val);
    } else if (val.type === 'min') {
      setPriceRange((prev) => {
        if (val.value > prev[1]) return prev;
        return [val.value, prev[1]];
      });
    } else {
      setPriceRange((prev) => {
        if (val.value < prev[0]) return prev;
        return [prev[0], val.value];
      });
    }
  };
  return (
    <>
      <Space wrap>
        <InputNumber
          name="price-from"
          addonBefore={<p className={styles['manual-input__label']}>From</p>}
          prefix={prefix}
          suffix={suffix}
          value={priceRange[0]}
          onChange={(val) => {
            onChangeValue({ value: val as number, type: 'min' });
          }}
        />
        <InputNumber
          name="price-to"
          addonBefore={<p className={styles['manual-input__label']}>To</p>}
          prefix={prefix}
          suffix={suffix}
          value={priceRange[1]}
          onChange={(val) => {
            onChangeValue({ value: val as number, type: 'max' });
          }}
        />
      </Space>
      <Slider
        min={min}
        max={max}
        range
        defaultValue={priceRange}
        onChange={(props) => {
          onChangeValue(props);
        }}
      />
    </>
  );
}
