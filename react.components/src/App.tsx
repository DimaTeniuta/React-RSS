import AppRouter from 'components/AppRouter';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
