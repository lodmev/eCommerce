import { ReactNode } from 'react';
import { UIMatch, useMatches, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useStoreSelector } from '../../hooks/userRedux';
import Overlay from '../Modal/Overlay';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../Modal/ModalConfirm';
import { CategoriesMap } from '../../types/types';
import Catalog from '../Catalog/Catalog';
import useAsync from '../../hooks/useAsync';
import { getProductCategoriesMap } from '../../api/products';
// import debug from '../../utils/debug';

export type CrumbTypes = 'mainList' | 'category' | 'subcategory';

type CrumbReturnType = { match: UIMatch; type: CrumbTypes };

type CrumbType = (match: UIMatch) => CrumbReturnType;

type MenuItem = {
  key: string;
  label: ReactNode;
};

const getNameById = (categoriesMap: CategoriesMap, locale: string, id: string = '') =>
  categoriesMap[id].name[locale];

const createMenuItems = (
  subPath: string,
  categoryId: string,
  categoriesMap: CategoriesMap,
  locale: string,
): MenuItem[] | undefined => {
  const categoriesId = categoriesMap[categoryId].childrenIds;
  if (categoriesId.length === 0) return undefined;
  return categoriesId.map((childId) => ({
    key: childId,
    label: <Link to={`${subPath}/${childId}`}>{getNameById(categoriesMap, locale, childId)}</Link>,
  }));
};

const createCrumbItems = (
  crumbs: CrumbReturnType[],
  categoriesMap: CategoriesMap,
  locale: string,
) => {
  // debug.log(categoriesMap);
  const items = Array<BreadcrumbItemType>();
  crumbs.forEach((crumb) => {
    let title: ReactNode;
    let menu: BreadcrumbItemType['menu'];
    if (crumb.type === 'mainList') {
      title = <Link to={crumb.match.pathname}>{getNameById(categoriesMap, locale, 'root')}</Link>;
      menu = {
        items: createMenuItems('./category', 'root', categoriesMap, locale),
      };
    } else if (crumb.type === 'category') {
      title = (
        <Link to={crumb.match.pathname}>
          {getNameById(categoriesMap, locale, crumb.match.params.catID)}
        </Link>
      );
      menu = {
        items: createMenuItems(
          `${crumb.match.pathname}/subcategory`,
          crumb.match.params.catID || '',
          categoriesMap,
          locale,
        ),
      };
    } else if (crumb.type === 'subcategory') {
      title = (
        <Link to={crumb.match.pathname}>
          {getNameById(categoriesMap, locale, crumb.match.params.subCatID)}
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
  let refetchCategory = false;
  const [productCategoriesMap, isLoading, err] = useAsync<CategoriesMap, undefined, boolean[]>(
    getProductCategoriesMap,
    [refetchCategory],
  );
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  const crumbs = matches
    .filter((match) => Boolean((match.handle as { crumb?: CrumbType })?.crumb))
    .map((match) => (match.handle as { crumb: CrumbType })?.crumb(match));
  return (
    <>
      {isLoading || err ? (
        <Overlay>
          {isLoading && <LoadingSpinner />}
          {err && (
            <ModalConfirm
              message={err.message}
              isError
              onConfirm={() => {
                refetchCategory = !refetchCategory;
              }}
            />
          )}
        </Overlay>
      ) : (
        productCategoriesMap && (
          <Breadcrumb items={createCrumbItems(crumbs, productCategoriesMap, locale)} />
        )
      )}
      <Catalog />
    </>
  );
}
