export const DEFAULT_LANGUAGE_KEY = 'en-US';
export const PRODUCT_DEFAULT_FETCH_LIMIT = 8;
export const CATALOG_PREVIEW_LIMIT = 2;
export const PRICE_FILTER_VALUES = {
  min: 1,
  max: 5000,
} as const;
export const DIMENSIONS_FILTER_VALUES = {
  min: 50,
  max: 6000,
} as const;

export const ROUTE_PATH = {
  main: '/',
  aboutUs: '/about-us',
  basket: '/basket',
  products: '/products',

  login: '/login',
  registration: '/registration',
  userProfile: '/user-profile',
  checkout: '/checkout',
};

export const COUNTRIES_OPTIONS_LIST = [
  {
    value: 'RU',
    label: 'Russia',
  },
  {
    value: 'UA',
    label: 'Ukraine',
  },
  {
    value: 'BY',
    label: 'Belarus',
  },
];
