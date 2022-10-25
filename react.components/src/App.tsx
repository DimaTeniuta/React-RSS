import AppRouter from 'components/AppRouter';
import MainProvider from 'context/MainProvider/MainProvider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <MainProvider>
          <AppRouter />
        </MainProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
