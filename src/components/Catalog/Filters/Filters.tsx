import { Button, Collapse, CollapseProps, Form, Select, Space } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Filters.module.css';
import RangeFilter, { RangeState, Range } from './Range';
import { DIMENSIONS_FILTER_VALUES, PRICE_FILTER_VALUES } from '../../../utils/globalVariables';
// import debug from '../../../utils/debug';

type AllFiltersState = {
  priceFilter: Range | null;
  widthFilter: Range | null;
  lengthFilter: Range | null;
  heightFilter: Range | null;
  colorFilter: string[];
};

const formatFilters = (allFilters: AllFiltersState): ReactNode => {
  const priceStr = allFilters.priceFilter ? ` price: ${allFilters.priceFilter.join('-')} €;` : '';
  const widthStr = allFilters.widthFilter ? ` width: ${allFilters.widthFilter.join('-')} mm;` : '';
  const lengthStr = allFilters.lengthFilter
    ? ` length: ${allFilters.lengthFilter.join('-')} mm;`
    : '';
  const heightStr = allFilters.heightFilter
    ? ` height: ${allFilters.heightFilter.join('-')} mm;`
    : '';
  const colorStr =
    allFilters.colorFilter.length > 0
      ? ` colors: ${allFilters.colorFilter.map((color) => `"${color}"`).join(', ')}`
      : '';
  if (priceStr || widthStr || lengthStr || heightStr || colorStr) {
    return `Already filtered for:${priceStr}${widthStr}${lengthStr}${heightStr}${colorStr}`;
  }
  return '';
};
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
const parseRange = (str: string | null): number[] | null => {
  if (str) {
    const match = str.match(/(\d{1,}) to (\d{1,})/);
    if (match && match instanceof Array) {
      return match.map((v) => Number(v)).filter((v) => !Number.isNaN(v));
    }
  }
  return null;
};
const getInitPriceState = (searchParams: URLSearchParams) => {
  const filterPrice = searchParams.get('f_price');
  const priceRange = parseRange(filterPrice);
  if (priceRange instanceof Array) {
    return priceRange.map((v) => v / 100);
  }
  return priceRange;
};

const getInitDimState = (
  searchParams: URLSearchParams,
  field: 'f_width' | 'f_length' | 'f_height',
) => {
  const dimField = searchParams.get(field);
  const dimRange = parseRange(dimField);
  return dimRange;
};
const getInitColors = (searchParams: URLSearchParams) => {
  const filterColors = searchParams.get('f_colors');
  if (filterColors) {
    const match = filterColors.match(/".*"/);
    if (match && match?.[0] && typeof match?.[0] === 'string') {
      return match[0].split(',').map((v) => v.replace(/["]+/g, ''));
    }
  }
  return [];
};

export default function Filters(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  // useEffect(() => {
  //   setSearchParams((urlSearchParams) => {
  //     urlSearchParams.forEach((_, key, parent) => {
  //       parent.delete(key);
  //     });
  //     return urlSearchParams;
  //   });
  // }, []);
  const defaultPriceState = [PRICE_FILTER_VALUES.min, PRICE_FILTER_VALUES.max];
  const defaultDimState = [DIMENSIONS_FILTER_VALUES.min, DIMENSIONS_FILTER_VALUES.max];
  const getInitFiltersState = () => ({
    priceFilter: getInitPriceState(searchParams),
    widthFilter: getInitDimState(searchParams, 'f_width'),
    lengthFilter: getInitDimState(searchParams, 'f_length'),
    heightFilter: getInitDimState(searchParams, 'f_height'),
    colorFilter: getInitColors(searchParams),
  });
  const [allFiltersState, setFiltersState] = useState<AllFiltersState>(getInitFiltersState());
  const priceState = useState<Range>(allFiltersState.priceFilter || defaultPriceState);
  const dimensionsStates = {
    width: useState<Range>(allFiltersState.widthFilter || defaultDimState),
    length: useState<Range>(allFiltersState.lengthFilter || defaultDimState),
    height: useState<Range>(allFiltersState.heightFilter || defaultDimState),
  };
  const colorsState = useState<string[]>(allFiltersState.colorFilter);
  const [filterLabel, setFilterLabel] = useState(formatFilters(allFiltersState));
  useEffect(() => {
    setFiltersState(getInitFiltersState());
    setFilterLabel(formatFilters(getInitFiltersState()));
  }, [searchParams]);
  const applyFilters = () => {
    setSearchParams((urlSearchParams) => {
      if (
        priceState[0][0] !== PRICE_FILTER_VALUES.min ||
        priceState[0][1] !== PRICE_FILTER_VALUES.max
      ) {
        urlSearchParams.set(
          'f_price',
          `variants.price.centAmount:range (${priceState[0][0] * 100} to ${priceState[0][1] * 100})`,
        );
        setFiltersState((filters) => ({
          ...filters,
          priceFilter: [priceState[0][0], priceState[0][1]],
        }));
      }
      if (
        dimensionsStates.width[0][0] !== DIMENSIONS_FILTER_VALUES.min ||
        dimensionsStates.width[0][1] !== DIMENSIONS_FILTER_VALUES.max
      ) {
        urlSearchParams.set(
          'f_width',
          `variants.attributes.width:range (${dimensionsStates.width[0][0]} to ${dimensionsStates.width[0][1]})`,
        );
        setFiltersState((filters) => ({
          ...filters,
          widthFilter: [dimensionsStates.width[0][0], dimensionsStates.width[0][1]],
        }));
      }
      if (
        dimensionsStates.length[0][0] !== DIMENSIONS_FILTER_VALUES.min ||
        dimensionsStates.length[0][1] !== DIMENSIONS_FILTER_VALUES.max
      ) {
        urlSearchParams.set(
          'f_length',
          `variants.attributes.length:range (${dimensionsStates.length[0][0]} to ${dimensionsStates.length[0][1]})`,
        );
        setFiltersState((filters) => ({
          ...filters,
          lengthFilter: [dimensionsStates.length[0][0], dimensionsStates.length[0][1]],
        }));
      }
      if (
        dimensionsStates.height[0][0] !== DIMENSIONS_FILTER_VALUES.min ||
        dimensionsStates.height[0][1] !== DIMENSIONS_FILTER_VALUES.max
      ) {
        urlSearchParams.set(
          'f_height',
          `variants.attributes.height:range (${dimensionsStates.height[0][0]} to ${dimensionsStates.height[0][1]})`,
        );
        setFiltersState((filters) => ({
          ...filters,
          heightFilter: [dimensionsStates.height[0][0], dimensionsStates.height[0][1]],
        }));
      }
      if (colorsState[0].length > 0) {
        urlSearchParams.set(
          'f_colors',
          `variants.attributes.upholstery_color.key:${colorsState[0].map((color) => `"${color}"`).join(',')}`,
        );
        setFiltersState((filters) => ({
          ...filters,
          colorFilter: colorsState[0],
        }));
      }
      return urlSearchParams;
    });
    setFilterLabel(formatFilters(allFiltersState));
  };
  const resetFilters = () => {
    priceState[1](defaultPriceState);
    dimensionsStates.width[1](defaultDimState);
    dimensionsStates.length[1](defaultDimState);
    dimensionsStates.height[1](defaultDimState);
    colorsState[1]([]);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams();
      prev.forEach((value, key) => {
        if (!key.startsWith('f_')) {
          newParams.set(key, value);
        }
      });
      return newParams;
    });
    setFiltersState(getInitFiltersState);
    setFilterLabel(formatFilters(allFiltersState));
  };

  const filterItems: CollapseProps['items'] = [
    {
      key: 'priceRange',
      label: 'Choose price range',
      children: (
        <RangeFilter
          valuesState={priceState}
          prefix="€"
          min={PRICE_FILTER_VALUES.min}
          max={PRICE_FILTER_VALUES.max}
        />
      ),
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
      label: 'Add filters',
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
  return (
    <>
      {filterLabel && <b>{filterLabel}</b>}
      <Collapse className={styles.filters} size="small" items={items} />
    </>
  );
}
