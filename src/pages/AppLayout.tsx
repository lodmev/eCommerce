import { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { getCurrentCustomer } from '../api/customers';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Overlay from '../components/Modal/Overlay';
import debug from '../utils/debug';
import { getToken } from '../utils/token';

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    if (!getToken()) return;

    getCurrentCustomer()
      .then((customer) => debug.log('customer: ', customer))
      .catch(debug.error);
  }, []);

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
