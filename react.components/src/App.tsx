import AppRouter from 'components/AppRouter';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
