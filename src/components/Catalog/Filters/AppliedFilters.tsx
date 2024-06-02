import { ReactNode } from 'react';
import { Range } from './Range';
import styles from './Filters.module.css';

export type AllFiltersState = {
  priceFilter: Range | null;
  widthFilter: Range | null;
  lengthFilter: Range | null;
  heightFilter: Range | null;
  colorFilter: string[];
};
export function AppliedFilters({ allFilters }: { allFilters: AllFiltersState }): ReactNode {
  const priceStr = allFilters.priceFilter ? (
    <>
      <span>price: {allFilters.priceFilter.join('-')} €</span>;
    </>
  ) : null;
  const widthStr = allFilters.widthFilter ? (
    <>
      <span>width: {allFilters.widthFilter.join('-')} mm</span>;
    </>
  ) : null;
  const lengthStr = allFilters.lengthFilter ? (
    <>
      <span>length: ${allFilters.lengthFilter.join('-')} mm</span>;
    </>
  ) : null;
  const heightStr = allFilters.heightFilter ? (
    <>
      <span>height: ${allFilters.heightFilter.join('-')} mm;</span>;
    </>
  ) : null;
  const colorStr =
    allFilters.colorFilter.length > 0 ? (
      <>
        <span>colors: {allFilters.colorFilter.map((color) => `"${color}"`).join(', ')}</span>;
      </>
    ) : null;
  if (priceStr || widthStr || lengthStr || heightStr || colorStr) {
    return (
      <p className={styles['applied-filters']}>
        Products shown with :{priceStr}
        {widthStr}
        {lengthStr}
        {heightStr}
        {colorStr}
      </p>
    );
  }
  return '';
}
