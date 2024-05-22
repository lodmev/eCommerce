import { ReactNode, useEffect } from 'react';
import { UIMatch, useMatches, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Category } from '@commercetools/platform-sdk';
import debug from '../../utils/debug';
import { useStoreDispatch, useStoreSelector } from '../../hooks/userRedux';
import { loadCategories } from '../../store/reducers/productReducers';
import Overlay from '../Modal/Overlay';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalConfirm from '../Modal/ModalConfirm';
import { setLoadProductsError } from '../../store/slices/productSlice';
// import { ROUTE_PATH } from '../../utils/globalVariables';
import Catalog from '../Catalog/Catalog';

type CrumbType = (data: UIMatch['data']) => ReactNode;

type MenuItem = {
  key: string;
  label: ReactNode;
};

const createCategoriesItems = (
  productCategories: Category[] | undefined,
  locale: string,
): MenuItem[] | undefined => {
  if (!productCategories || productCategories.length === 0) return undefined;
  return productCategories
    .filter((category) => category.ancestors.length === 0)
    .map((category) => ({
      key: category.id,
      label: <Link to={`./category/${category.id}`}>{category.name[locale]}</Link>,
    }));
};

const createCrumbItems = (
  crumbs: ReactNode[],
  categories: Category[] | undefined,
  locale: string,
) =>
  crumbs.map((crumb) => ({
    title: crumb,
    menu: {
      items: createCategoriesItems(categories, locale),
    },
  }));
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
    .map((match) => (match.handle as { crumb: CrumbType })?.crumb(match.data));
  debug.log(crumbs);
  // const brItems = createItems(crumbs);
  return (
    <>
      {(isLoading || errorMsg !== '') && (
        <Overlay>
          {isLoading && <LoadingSpinner />}
          {errorMsg && (
            <ModalConfirm
              message={errorMsg}
              isError
              onConfirm={() => dispatch(setLoadProductsError(''))}
            />
          )}
        </Overlay>
      )}
      <Breadcrumb items={createCrumbItems(crumbs, productCategories?.results, locale)} />
      <Catalog />
    </>
  );
}
