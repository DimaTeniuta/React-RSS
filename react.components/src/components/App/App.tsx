import AppRouter from 'components/AppRouter';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
