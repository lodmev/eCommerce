import { InputNumber, Slider, Space } from 'antd';
import styles from './Filters.module.css';
import { PRICE_FILTER_VALUES } from '../../../utils/globalVariables';

type Value = { value: number; type: 'min' | 'max' } | number[];

export default function PriceFilter({
  priceState,
}: {
  priceState: [number[], React.Dispatch<React.SetStateAction<number[]>>];
}) {
  const [priceRange, setPriceRange] = priceState;
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
          addonBefore={<p className={styles['input-price__label']}>From</p>}
          prefix="€"
          value={priceRange[0]}
          onChange={(val) => {
            onChangeValue({ value: val as number, type: 'min' });
          }}
        />
        <InputNumber
          name="price-to"
          addonBefore={<p className={styles['input-price__label']}>To</p>}
          prefix="€"
          value={priceRange[1]}
          onChange={(val) => {
            onChangeValue({ value: val as number, type: 'max' });
          }}
        />
      </Space>
      <Slider
        min={PRICE_FILTER_VALUES.minPrice}
        max={PRICE_FILTER_VALUES.maxPrice}
        range
        defaultValue={priceRange}
        onChange={(props) => {
          onChangeValue(props);
        }}
      />
    </>
  );
}
