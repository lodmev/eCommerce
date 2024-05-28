import { CategoryPagedQueryResponse, ProductProjection } from '@commercetools/platform-sdk';
import { getCurrentApiClient } from './apiRoot';
import { CategoriesMap, SearchProductsQuery } from '../types/types';
import { DEFAULT_LANGUAGE_KEY } from '../utils/globalVariables';

export const getAllProducts = async (): Promise<ProductProjection[]> => {
  const response = await getCurrentApiClient().productProjections().get().execute();
  return response.body.results;
};

export const getProductById = async (ID: string): Promise<ProductProjection> => {
  const response = await getCurrentApiClient().productProjections().withId({ ID }).get().execute();
  return response.body;
};

export const getProductsCategories = async (): Promise<CategoryPagedQueryResponse> => {
  const response = await getCurrentApiClient().categories().get().execute();
  return response.body;
};

export const getProductCategoriesMap = async (): Promise<CategoriesMap> => {
  const categoriesResponse = await getProductsCategories();
  const categories = categoriesResponse.results;
  const categoriesMap: CategoriesMap = {
    '': {
      name: { [DEFAULT_LANGUAGE_KEY]: 'unknown category' },
      childrenIds: [],
    },
    root: {
      name: { [DEFAULT_LANGUAGE_KEY]: 'Categories' },
      childrenIds: [],
    },
  };
  categories.forEach((category) => {
    if (!categoriesMap[category.id]) {
      categoriesMap[category.id] = {
        name: category.name,
        childrenIds: [],
      };
    } else {
      categoriesMap[category.id].name = category.name;
    }
    if (category.ancestors.length > 0) {
      category.ancestors.forEach((ancestor) => {
        const ancestorCategory = categoriesMap[ancestor.id];
        if (!ancestorCategory) {
          categoriesMap[ancestor.id] = {
            name: { '': '' },
            childrenIds: [],
          };
        }
        ancestorCategory.childrenIds.push(category.id);
      });
    } else {
      categoriesMap.root.childrenIds.push(category.id);
    }
  });
  return categoriesMap;
};

export const searchProducts = async (queryArgs?: SearchProductsQuery) => {
  const response = await getCurrentApiClient()
    .productProjections()
    .search()
    .get(queryArgs)
    .execute();
  return response.body;
};
