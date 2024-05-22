import { Link, Outlet, createBrowserRouter } from 'react-router-dom';
import AboutUs from '../pages/AboutUs/AboutUs';
import NotFound from '../pages/NotFound/NotFound';
import AppLayout from '../pages/AppLayout';
import Basket from '../pages/Basket/Basket';
import Login from '../pages/Login/Login';
import Main from '../pages/Main/Main';
import Registration from '../pages/Registration/Registration';
import UserProfile from '../pages/UserProfile/UserProfile';
import { ROUTE_PATH } from '../utils/globalVariables';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import DetailedProduct from '../pages/DetailedProduct/DetailedProduct';

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
        element: <Breadcrumbs />,
        path: ROUTE_PATH.products,
        handle: {
          crumb: () => <Link to={ROUTE_PATH.products}>All products</Link>,
        },
        children: [
          {
            path: `${ROUTE_PATH.products}/category/:id`,
            element: <Outlet />,
            handle: {
              crumb: (id?: string) => <Link to={`.subcategory/${id}`}>Subcategory</Link>,
            },
            children: [
              {
                path: `${ROUTE_PATH.products}/category/:id/subcategory/:id`,
                element: <Outlet />,
                handle: {
                  crumb: () => <Link to="./subcategory/">Subcategory</Link>,
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
        path: ROUTE_PATH.userProfile,
      },
    ],
  },
]);

export default router;
