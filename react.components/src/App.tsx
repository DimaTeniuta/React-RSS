import AppRouter from 'components/AppRouter';
import { FormsProvider } from 'context/FormsProvider';
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
          <FormsProvider>
            <AppRouter />
          </FormsProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
