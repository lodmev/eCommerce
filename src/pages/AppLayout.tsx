import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getCurrentCustomer } from '../api/customers';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { setUserId, setUserVersion } from '../store/slices/userSlice';
import debug from '../utils/debug';
import { isUseAnon, isUserAuthorized } from '../utils/token';
import { useStoreDispatch } from '../hooks/userRedux';
import { fetchCartData } from '../store/slices/basketSlice';

export default function AppLayout() {
  const dispatch = useStoreDispatch();

  // update store  states
  useEffect(() => {
    if (isUserAuthorized()) {
      getCurrentCustomer()
        .then((customer) => {
          // debug.log('customer: ', customer);
          dispatch(setUserVersion(customer.version));
          dispatch(setUserId(customer.id));
        })
        .catch(debug.error);
    }
    if (isUserAuthorized() || isUseAnon()) {
      dispatch(fetchCartData());
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
