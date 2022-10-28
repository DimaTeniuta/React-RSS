import AppRouter from 'components/AppRouter';
import Provider from 'context/Provider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Provider>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
