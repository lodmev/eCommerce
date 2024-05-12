import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getCurrentCustomer } from '../api/customers';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import debug from '../utils/debug';
import { getToken } from '../utils/token';

export default function AppLayout() {
  useEffect(() => {
    if (!getToken()) return;

    getCurrentCustomer()
      .then((customer) => debug.log('customer: ', customer))
      .catch(debug.error);
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
