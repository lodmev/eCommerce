import { Button, Collapse, CollapseProps, Form, Space } from 'antd';
import { ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Filters.module.css';
import PriceFilter from './Price';
import { PRICE_FILTER_VALUES } from '../../../utils/globalVariables';
import debug from '../../../utils/debug';

export default function Filters(): ReactNode {
  const [, setSearchParams] = useSearchParams();
  const priceState = useState<number[]>([
    PRICE_FILTER_VALUES.minPrice,
    PRICE_FILTER_VALUES.maxPrice,
  ]);
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
      key: '1',
      label: 'Chose price range',
      children: <PriceFilter priceState={priceState} />,
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
