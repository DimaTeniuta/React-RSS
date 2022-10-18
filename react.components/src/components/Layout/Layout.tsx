import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
