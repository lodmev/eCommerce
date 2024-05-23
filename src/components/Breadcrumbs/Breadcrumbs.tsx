import { ReactNode, useEffect } from 'react';
import { UIMatch, useMatches, Link, Outlet } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Category, LocalizedString } from '@commercetools/platform-sdk';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import { loadCategories } from '../../store/reducers/productReducers';
import Overlay from '../Modal/Overlay';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../Modal/ModalConfirm';
import { setLoadProductsError } from '../../store/slices/productSlice';
import Catalog from '../Catalog/Catalog';

export type CrumbTypes = 'mainList' | 'category' | 'subcategory';

type CrumbReturnType = { match: UIMatch; type: CrumbTypes };

type CrumbType = (match: UIMatch) => CrumbReturnType;

type NamedMap = Map<string, LocalizedString>;

type MenuItem = {
  key: string;
  label: ReactNode;
};
const createCategoriesMap = (categories: Category[]) => {
  const namedMap = new Map<string, LocalizedString>();
  const subcategoriesMap = new Map<string, string[]>();
  categories.forEach((category) => {
    namedMap.set(category.id, category.name);
    if (category.ancestors.length > 0) {
      category.ancestors.forEach((ancestor) => {
        const root = subcategoriesMap.get(ancestor.id);
        if (!root) {
          subcategoriesMap.set(ancestor.id, [category.id]);
        } else {
          root.push(category.id);
        }
      });
    }
  });
  return { namedMap, subcategoriesMap };
};

const getNameById = (namedMap: NamedMap, locale: string, id?: string) => {
  const name = namedMap.get(id || '');
  return name ? name[locale] : 'unknown category';
};

const createMenuItems = (
  path: string,
  categoriesId: string[],
  namedMap: NamedMap,
  locale: string,
): MenuItem[] | undefined => {
  if (categoriesId.length === 0) return undefined;
  return categoriesId.map((categoryId) => ({
    key: categoryId,
    label: <Link to={`${path}/${categoryId}`}>{getNameById(namedMap, locale, categoryId)}</Link>,
  }));
};

const createCrumbItems = (crumbs: CrumbReturnType[], categories: Category[], locale: string) => {
  const { namedMap, subcategoriesMap } = createCategoriesMap(categories);
  const items = Array<BreadcrumbItemType>();
  crumbs.forEach((crumb) => {
    let title: ReactNode;
    let menu: BreadcrumbItemType['menu'];
    if (crumb.type === 'mainList') {
      title = <Link to={crumb.match.pathname}>Categories</Link>;
      menu = {
        items: createMenuItems('./category', Array.from(subcategoriesMap.keys()), namedMap, locale),
      };
    } else if (crumb.type === 'category') {
      title = (
        <Link to={crumb.match.pathname}>
          {getNameById(namedMap, locale, crumb.match.params.id)}
        </Link>
      );
      menu = {
        items: createMenuItems(
          `${crumb.match.pathname}/subcategory`,
          subcategoriesMap.get(crumb.match.params.id!) || [],
          namedMap,
          locale,
        ),
      };
    } else if (crumb.type === 'subcategory') {
      title = (
        <Link to={crumb.match.pathname}>
          {getNameById(namedMap, locale, crumb.match.params.subId)}
        </Link>
      );
      menu = undefined;
    }
    items.push({
      title,
      menu,
    });
  });
  return items;
};
export default function Breadcrumbs(): ReactNode {
  const matches = useMatches();
  const dispatch = useStoreDispatch();
  const { productCategories, isLoading, errorMsg } = useStoreSelector((state) => state.productData);
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  const crumbs = matches
    .filter((match) => Boolean((match.handle as { crumb?: CrumbType })?.crumb))
    .map((match) => (match.handle as { crumb: CrumbType })?.crumb(match));
  return (
    <>
      {(isLoading || errorMsg !== '') && (
        <Overlay>
          {isLoading && <LoadingSpinner />}
          {errorMsg && (
            <ModalConfirm
              message={errorMsg}
              isError
              onConfirm={() => {
                dispatch(setLoadProductsError(''));
              }}
            />
          )}
        </Overlay>
      )}
      <Breadcrumb items={createCrumbItems(crumbs, productCategories, locale)} />
      {<Outlet /> && <Catalog />}
    </>
  );
}
