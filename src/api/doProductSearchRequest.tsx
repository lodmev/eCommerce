import { Params } from 'react-router-dom';
import { searchProducts } from './products';
import { QueryArgs } from '../types/types';
// import debug from '../../utils/debug';

type RouteParams = Readonly<Params<string>>;
export type RequestParams = {
  routeParams?: RouteParams;
  searchParams: URLSearchParams;
  sortParams: string;
  searchRequest: { locale: string; value: string };
  limit?: number;
  offset?: number;
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
  searchRequest,
  limit,
  offset,
}: RequestParams): QueryArgs => {
  const queryArgs: QueryArgs = {
    limit,
    offset,
  };
  // add search text
  if (searchRequest.value) {
    queryArgs[`text.${searchRequest.locale}`] = searchRequest.value;
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
export const doSearchRequest = async (params: RequestParams) => {
  const query = getQuery(params);
  return searchProducts(query);
};
