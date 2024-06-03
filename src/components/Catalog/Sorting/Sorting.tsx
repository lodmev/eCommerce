import { Button, Collapse, Segmented, Space, Tooltip } from 'antd';
import { SegmentedOptions, SegmentedValue } from 'antd/es/segmented';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './Sorting.module.css';
import { useStoreSelector } from '../../../hooks/userRedux';
// import debug from '../../../utils/debug';

type Order = 'asc' | 'desc';

function SortElement({
  setSortParams,
}: {
  setSortParams: React.Dispatch<React.SetStateAction<string>>;
}) {
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  const [selectedValue, setSelectedValue] = useState<SegmentedValue>('');
  const [sortOrder, setSortOrder] = useState<Order>('asc');
  useEffect(() => {
    switch (selectedValue) {
      case 'name':
        setSortParams(`name.${locale} ${sortOrder}`);
        break;
      case 'price':
        setSortParams(`price ${sortOrder}`);
        break;
      default:
        setSortParams('');
    }
  }, [selectedValue, sortOrder]);

  const ascChecked = selectedValue !== '' && sortOrder === 'asc' ? styles['order-checked'] : '';
  const descChecked = selectedValue !== '' && sortOrder === 'desc' ? styles['order-checked'] : '';

  const options: SegmentedOptions = [
    {
      value: '',
      label: 'default',
    },
    {
      value: 'price',
      label: 'price',
      className: styles['sort-item'],
    },
    {
      value: 'name',
      label: 'name',
    },
  ];
  return (
    <Space>
      <Segmented
        className={styles['sort-segments']}
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
      />
      <Space>
        order:
        <Tooltip title="Ascending order">
          <Button
            disabled={selectedValue === ''}
            onClick={() => {
              setSortOrder('asc');
            }}
            icon={<FontAwesomeIcon icon={faCircleChevronUp} className={ascChecked} />}
          />
        </Tooltip>
        <Tooltip title="Descending order">
          <Button
            disabled={selectedValue === ''}
            onClick={() => {
              setSortOrder('desc');
            }}
            icon={<FontAwesomeIcon icon={faCircleChevronDown} className={descChecked} />}
          />
        </Tooltip>
      </Space>
    </Space>
  );
}

export default function Sorting({
  setSortParams,
}: {
  setSortParams: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Collapse
      className={styles.sorting}
      size="small"
      collapsible="icon"
      items={[
        {
          key: 'sortParent',
          label: (
            <div>
              Sort by:
              <SortElement setSortParams={setSortParams} />
            </div>
          ),
          showArrow: false,
        },
      ]}
    />
  );
}
