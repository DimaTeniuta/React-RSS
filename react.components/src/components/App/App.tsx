import AppRouter from 'components/AppRouter';
import Header from 'components/Header/Header';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
