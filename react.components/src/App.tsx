import AppRouter from 'components/AppRouter';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
