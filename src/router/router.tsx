import { Link, createBrowserRouter } from 'react-router-dom';
import AboutUs from '../pages/AboutUs/AboutUs';
import NotFound from '../pages/NotFound/NotFound';
import AppLayout from '../pages/AppLayout';
import Basket from '../pages/Basket/Basket';
import DetailedProduct from '../pages/DetailedProduct/DetailedProduct';
import Login from '../pages/Login/Login';
import Main from '../pages/Main/Main';
import Registration from '../pages/Registration/Registration';
import UserProfile from '../pages/UserProfile/UserProfile';
import { ROUTE_PATH } from '../utils/globalVariables';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Categories from '../components/Breadcrumbs/Categories';

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
        path: ROUTE_PATH.catalogProduct,
        handle: {
          crumb: () => <Link to="./categories/:id">Categories</Link>,
        },
        children: [
          {
            path: `${ROUTE_PATH.catalogProduct}/categories`,
            // loader: async () => getProductCategories(),
            element: <Categories />,
            handle: {
              crumb: () => <Link to="./subcategory">Subcategory</Link>,
            },
          },
        ],
      },
      {
        element: <DetailedProduct />,
        path: ROUTE_PATH.detailedProduct,
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
