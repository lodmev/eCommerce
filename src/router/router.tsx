import { createBrowserRouter } from 'react-router-dom';
import AboutUs from '../pages/AboutUs/AboutUs';
import NotFound from '../pages/NotFound/NotFound';
import AppLayout from '../pages/AppLayout';
import Basket from '../pages/Basket/Basket';
import CatalogProduct from '../pages/CatalogProduct/CatalogProduct';
import DetailedProduct from '../pages/DetailedProduct/DetailedProduct';
import Login from '../pages/Login/Login';
import Main from '../pages/Main/Main';
import Registration from '../pages/Registration/Registration';
import UserProfile from '../pages/UserProfile/UserProfile';
import userProfileLoader from '../pages/UserProfile/UserProfileLoader';
import { ROUTE_PATH } from '../utils/globalVariables';

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
        element: <CatalogProduct />,
        path: ROUTE_PATH.catalogProduct,
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
        loader: userProfileLoader,
        path: ROUTE_PATH.userProfile,
      },
    ],
  },
]);

export default router;
