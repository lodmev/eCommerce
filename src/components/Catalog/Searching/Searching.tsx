import { Collapse } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import styles from './Searching.module.css';

type SearchInputProps = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
};

function SearchInput({ setSearchText, loading }: SearchInputProps) {
  const onSearch: SearchProps['onSearch'] = (value, event) => {
    event?.stopPropagation();
    setSearchText(value);
  };
  return (
    <Search
      className={styles['search-input']}
      placeholder="input search text"
      allowClear
      enterButton="Search"
      loading={loading}
      size="small"
      onSearch={onSearch}
    />
  );
}

export default function Searching({ setSearchText, loading }: SearchInputProps) {
  return (
    <Collapse
      className={styles.searching}
      size="small"
      collapsible="icon"
      items={[
        {
          key: 'searchParent',
          label: <SearchInput setSearchText={setSearchText} loading={loading} />,
          showArrow: false,
        },
      ]}
    />
  );
}
