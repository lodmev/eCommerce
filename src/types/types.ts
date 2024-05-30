import { CustomerDraft, LocalizedString, QueryParam } from '@commercetools/platform-sdk';

export type Writable<T> = { -readonly [P in keyof T]: T[P] };
export type RegisterCustomerDraft = Writable<
  CustomerDraft & Required<Pick<CustomerDraft, 'password' | 'addresses'>>
>;

export type CategoriesMap = {
  [id: string]: {
    name: LocalizedString;
    childrenIds: string[];
  };
};

export type QueryArgs = {
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  filter?: string | string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  facet?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  [key: string]: QueryParam;
};
