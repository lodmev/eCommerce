import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigation } from 'react-router-dom';
import { getCurrentCustomer } from '../api/customers';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Overlay from '../components/Modal/Overlay';
import { setUserId, setUserVersion } from '../store/slices/userSlice';
import debug from '../utils/debug';
import { getCart } from '../api/cart';
import { isUserAuthorized } from '../utils/token';

export default function AppLayout() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    getCart().then(debug.log).catch(debug.error);
    if (!isUserAuthorized()) return;
    getCurrentCustomer().then((customer) => {
      debug.log('customer: ', customer);
      dispatch(setUserVersion(customer.version));
      dispatch(setUserId(customer.id));
    });
    // .catch(debug.error);
  }, [dispatch]);

  return (
    <div className="container">
      {isLoading && (
        <Overlay>
          <LoadingSpinner />
        </Overlay>
      )}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
