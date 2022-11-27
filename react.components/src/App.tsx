import AppRouter from 'route/AppRouter';
import { CardFormProvider } from 'store/context/CardFormProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from 'store/store';

function App(): JSX.Element {
  const store = setupStore();

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <CardFormProvider>
            <AppRouter />
          </CardFormProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
