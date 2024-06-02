export const DEFAULT_LANGUAGE_KEY = 'en-US';
export const PRODUCT_DEFAULT_FETCH_LIMIT = 8;
export const PRICE_FILTER_VALUES = {
  minPrice: 1,
  maxPrice: 10000,
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
