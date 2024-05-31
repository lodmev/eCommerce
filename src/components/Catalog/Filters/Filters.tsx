import { Button, Collapse, CollapseProps, Form, Select, Space } from 'antd';
import { ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Filters.module.css';
import RangeFilter, { RangeState, Range } from './Range';
import { DIMENSIONS_FILTER_VALUES, PRICE_FILTER_VALUES } from '../../../utils/globalVariables';
// import debug from '../../../utils/debug';

function getDimensionsItem(dimensionsStates: {
  width: RangeState;
  length: RangeState;
  height: RangeState;
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
  const initPriceState = [PRICE_FILTER_VALUES.min, PRICE_FILTER_VALUES.max];
  const initDimState = [DIMENSIONS_FILTER_VALUES.min, DIMENSIONS_FILTER_VALUES.max];
  const priceState = useState<Range>(initPriceState);
  const dimensionsStates = {
    width: useState<Range>(initDimState),
    length: useState<Range>(initDimState),
    height: useState<Range>(initDimState),
  };
  const colorsState = useState<string[]>([]);
  const applyFilters = () => {
    setSearchParams((urlSearchParams) => {
      urlSearchParams.set('f_price', `(${priceState[0][0] * 100} to ${priceState[0][1] * 100})`);
      urlSearchParams.set(
        'f_width',
        `(${dimensionsStates.width[0][0]} to ${dimensionsStates.width[0][1]})`,
      );
      urlSearchParams.set(
        'f_length',
        `(${dimensionsStates.length[0][0]} to ${dimensionsStates.length[0][1]})`,
      );
      urlSearchParams.set(
        'f_height',
        `(${dimensionsStates.height[0][0]} to ${dimensionsStates.height[0][1]})`,
      );
      return urlSearchParams;
    });
  };
  const resetFilters = () => {
    priceState[1](initPriceState);
    dimensionsStates.width[1](initDimState);
    dimensionsStates.length[1](initDimState);
    dimensionsStates.height[1](initDimState);
    colorsState[1]([]);
    setSearchParams((urlSearchParams) => {
      const iteratorKey = urlSearchParams.keys();
      let key = iteratorKey.next();
      while (!key.done) {
        if (key.value.startsWith('f_')) {
          urlSearchParams.delete(key.value);
        }
        key = iteratorKey.next();
      }
      return urlSearchParams;
    });
  };

  const filterItems: CollapseProps['items'] = [
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
          value={colorsState[0]}
          onChange={(value) => {
            colorsState[1](value);
          }}
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
          <Collapse size="small" items={filterItems} />
          <Space className={styles['form-buttons']}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
            <Button htmlType="button" onClick={resetFilters}>
              Reset
            </Button>
          </Space>
        </Form>
      ),
    },
  ];
  return <Collapse className={styles.filters} size="small" items={items} />;
}
