import { ReactNode } from 'react';
import { UIMatch, useMatches, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useStoreSelector } from '../../hooks/userRedux';
import { CategoriesMap } from '../../types/types';
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
export default function Breadcrumbs({
  categoriesMap,
  className,
}: {
  categoriesMap?: CategoriesMap;
  className?: string;
}): ReactNode {
  const matches = useMatches();
  const locale = useStoreSelector((state) => state.userData.userLanguage);
  const crumbs = matches
    .filter((match) => Boolean((match.handle as { crumb?: CrumbType })?.crumb))
    .map((match) => (match.handle as { crumb: CrumbType })?.crumb(match));
  return (
    categoriesMap && (
      <Breadcrumb className={className} items={createCrumbItems(crumbs, categoriesMap, locale)} />
    )
  );
}
