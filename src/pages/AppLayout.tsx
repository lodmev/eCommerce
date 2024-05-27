import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigation } from 'react-router-dom';
import { getCurrentCustomer } from '../api/customers';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Overlay from '../components/Modal/Overlay';
import { setUserVersion } from '../store/slices/userSlice';
import debug from '../utils/debug';
import { getToken } from '../utils/token';

export default function AppLayout() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    if (!getToken()) return;

    getCurrentCustomer()
      .then((customer) => {
        debug.log('customer: ', customer);
        dispatch(setUserVersion(customer.version));
      })
      .catch(debug.error);
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
