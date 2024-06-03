import { Params } from 'react-router-dom';
import { PRODUCT_DEFAULT_FETCH_LIMIT } from '../utils/globalVariables';
import { searchProducts } from './products';
import { QueryArgs } from '../types/types';
// import debug from '../../utils/debug';

type RouteParams = Readonly<Params<string>>;
type RequestParams = {
  routeParams?: RouteParams;
  searchParams: URLSearchParams;
  sortParams: string;
  searchRequest: { locale: string; value: string };
};

export const getID = (routeParams?: RouteParams) =>
  routeParams?.subCatID || routeParams?.catID || '';
const appendFilters = ({
  locationParams,
  queryArgs,
}: {
  locationParams: Omit<RequestParams, 'sortParams' | 'searchRequest'>;
  queryArgs: QueryArgs;
}) => {
  const id: string = getID(locationParams.routeParams);
  if (!id && locationParams.searchParams.size === 0) {
    return queryArgs;
  }

  const filterQuery: string[] = [];
  queryArgs['filter.query'] = filterQuery;

  if (id) {
    filterQuery.push(`categories.id:"${id}"`);
  }
  // const priceRange = locationParams.searchParams.get('f_price');
  locationParams.searchParams.forEach((value, key) => {
    if (key.startsWith('f_')) filterQuery.push(value);
  });
  return queryArgs;
};
const getQuery = ({
  routeParams,
  searchParams,
  sortParams,
  searchRequest: searchText,
}: RequestParams): QueryArgs => {
  const queryArgs: QueryArgs = {
    limit: PRODUCT_DEFAULT_FETCH_LIMIT,
  };
  // add search text
  if (searchText.value) {
    queryArgs[`text.${searchText.locale}`] = searchText.value;
    queryArgs.fuzzy = true;
  }
  // append filters
  appendFilters({ locationParams: { routeParams, searchParams }, queryArgs });
  // set sort params
  if (sortParams === '') {
    queryArgs.sort = [`score asc`];
    queryArgs.sort.push('id asc');
  } else {
    queryArgs.sort = [sortParams];
  }
  return queryArgs;
};
export const doSearchRequest = async ({
  routeParams,
  searchParams,
  sortParams,
  searchRequest: searchText,
}: RequestParams) => {
  const query = getQuery({ routeParams, searchParams, sortParams, searchRequest: searchText });
  return searchProducts(query);
};
