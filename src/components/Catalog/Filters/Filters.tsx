import { Button, Collapse, CollapseProps, Form, Select, Space } from 'antd';
import { ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Filters.module.css';
import RangeFilter from './Range';
import { DIMENSIONS_FILTER_VALUES, PRICE_FILTER_VALUES } from '../../../utils/globalVariables';
import debug from '../../../utils/debug';

type Range = number[];

function getDimensionsItem(dimensionsStates: {
  width: [Range, React.Dispatch<React.SetStateAction<Range>>];
  length: [Range, React.Dispatch<React.SetStateAction<Range>>];
  height: [Range, React.Dispatch<React.SetStateAction<Range>>];
}) {
  return {
    key: 'dimensions',
    label: 'Choose dimensions range',
    children: (
      <Collapse
        size="small"
        defaultActiveKey={['width', 'length', 'height']}
        bordered={false}
        items={[
          {
            key: 'width',
            label: 'width',
            children: (
              <RangeFilter
                valuesState={dimensionsStates.width}
                suffix="mm"
                min={DIMENSIONS_FILTER_VALUES.min}
                max={DIMENSIONS_FILTER_VALUES.max}
              />
            ),
          },
          {
            key: 'length',
            label: 'length',
            children: (
              <RangeFilter
                valuesState={dimensionsStates.length}
                suffix="mm"
                min={DIMENSIONS_FILTER_VALUES.min}
                max={DIMENSIONS_FILTER_VALUES.max}
              />
            ),
          },
          {
            key: 'height',
            label: 'height',
            children: (
              <RangeFilter
                valuesState={dimensionsStates.height}
                suffix="mm"
                min={DIMENSIONS_FILTER_VALUES.min}
                max={DIMENSIONS_FILTER_VALUES.max}
              />
            ),
          },
        ]}
      />
    ),
  };
}

export default function Filters(): ReactNode {
  const [, setSearchParams] = useSearchParams();
  const priceState = useState<Range>([PRICE_FILTER_VALUES.min, PRICE_FILTER_VALUES.max]);
  const dimensionsStates = {
    width: useState<Range>([DIMENSIONS_FILTER_VALUES.min, DIMENSIONS_FILTER_VALUES.max]),
    length: useState<Range>([DIMENSIONS_FILTER_VALUES.min, DIMENSIONS_FILTER_VALUES.max]),
    height: useState<Range>([DIMENSIONS_FILTER_VALUES.min, DIMENSIONS_FILTER_VALUES.max]),
  };
  const [priceRange] = priceState;
  const applyFilters = () => {
    setSearchParams((prev) => {
      prev.set('f_price', `(${priceRange[0] * 100} to ${priceRange[1] * 100})`);
      debug.log(prev);
      return prev;
    });
  };
  const FilterItems: CollapseProps['items'] = [
    {
      key: 'priceRange',
      label: 'Choose price range',
      children: <RangeFilter valuesState={priceState} prefix="€" />,
    },
    getDimensionsItem(dimensionsStates),
    {
      key: 'colors',
      label: 'Choose colors',
      children: (
        <Select
          size="small"
          placeholder="Select colors"
          className={styles['select-color']}
          mode="multiple"
          options={[
            {
              label: 'Black',
              value: 'black',
            },
            {
              label: 'Blue',
              value: 'blue',
            },
            {
              label: 'Green',
              value: 'green',
            },
            {
              label: 'White',
              value: 'white',
            },
          ]}
        />
      ),
    },
  ];
  const items: CollapseProps['items'] = [
    {
      key: 1,
      label: 'Filters',
      children: (
        <Form onFinish={applyFilters}>
          <Collapse size="small" items={FilterItems} />
          <Space className={styles['form-buttons']}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
            <Button htmlType="button">Reset</Button>
          </Space>
        </Form>
      ),
    },
  ];
  return <Collapse className={styles.filters} size="small" items={items} />;
}
