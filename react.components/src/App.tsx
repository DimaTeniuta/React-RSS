import AppRouter from 'route/AppRouter';
import { FormCardProvider } from 'store/context/FormCardProvider';
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
          <FormCardProvider>
            <AppRouter />
          </FormCardProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
