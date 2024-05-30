import { Button, Collapse, CollapseProps } from 'antd';
import { ReactNode, useState } from 'react';
import styles from './Filters.module.css';
import PriceFilter from './Price';

export default function Filters(): ReactNode {
  const [needReset, setNeedReset] = useState(false);
  const FilterItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Chose price range',
      children: <PriceFilter needReset={needReset} />,
    },
  ];
  const items: CollapseProps['items'] = [
    {
      key: 1,
      label: 'Filters',
      children: (
        <>
          <Collapse size="small" items={FilterItems} />
          <Button
            onClick={() => {
              setNeedReset((prev) => !prev);
            }}
          >
            Reset all
          </Button>
        </>
      ),
    },
  ];
  return <Collapse className={styles.filters} size="small" items={items} />;
}
