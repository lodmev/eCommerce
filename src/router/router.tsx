import { Navigate, createBrowserRouter } from 'react-router-dom';
import AboutUs from '../pages/AboutUs/AboutUs';
import NotFound from '../pages/NotFound/NotFound';
import AppLayout from '../pages/AppLayout';
import Basket from '../pages/Basket/Basket';
import Login from '../pages/Login/Login';
import Main from '../pages/Main/Main';
import Registration from '../pages/Registration/Registration';
import UserProfile from '../pages/UserProfile/UserProfile';
import userProfileLoader from '../pages/UserProfile/UserProfileLoader';
import { ROUTE_PATH } from '../utils/globalVariables';
import { CrumbTypes } from '../components/Breadcrumbs/Breadcrumbs';
import DetailedProduct from '../pages/DetailedProduct/DetailedProduct';
import Catalog from '../components/Catalog/Catalog';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <Main />,
        path: ROUTE_PATH.main,
      },
      {
        element: <AboutUs />,
        path: ROUTE_PATH.aboutUs,
      },
      {
        element: <Basket />,
        path: ROUTE_PATH.basket,
      },
      {
        element: <Catalog />,
        path: ROUTE_PATH.products,
        handle: {
          crumb: (match: { id?: string }, type: CrumbTypes = 'mainList') => ({ match, type }),
        },
        children: [
          {
            path: `${ROUTE_PATH.products}/category/:catID`,
            element: <Catalog />,
            handle: {
              crumb: (match: { id?: string }, type: CrumbTypes = 'category') => ({ match, type }),
            },
            children: [
              {
                path: `${ROUTE_PATH.products}/category/:catID/subcategory/:subCatID`,
                element: <Catalog />,
                handle: {
                  crumb: (match: { id?: string }, type: CrumbTypes = 'subcategory') => ({
                    match,
                    type,
                  }),
                },
              },
            ],
          },
        ],
      },
      {
        element: <DetailedProduct />,
        path: `${ROUTE_PATH.products}/:id`,
      },
      {
        element: <Login />,
        path: ROUTE_PATH.login,
      },
      {
        element: <Registration />,
        path: ROUTE_PATH.registration,
      },
      {
        element: <UserProfile />,
        loader: userProfileLoader,
        path: ROUTE_PATH.userProfile,
        errorElement: <Navigate to={ROUTE_PATH.login} />,
      },
    ],
  },
]);

export default router;
