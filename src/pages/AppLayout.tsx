import { Outlet } from 'react-router-dom';
// import { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

// import { loginUser } from '../api/customers';
// import { getAllProducts, getProductById } from '../api/products';

export default function AppLayout() {
  // useEffect(() => {
  //   loginUser({ email: 'some@example.com', password: 'password@1' }).then(console.log).catch(console.error);
  //   getAllProducts().then(console.log).catch(console.error);
  //   getProductById('e679b176-7421-4f41-8a33-b79b705298a8').then(console.log).catch(console.error);
  // });
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
