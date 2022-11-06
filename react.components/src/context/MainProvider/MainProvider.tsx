import { WRONG_HTTP_ANSWER } from 'API/httpRequest';
import React, { createContext, FC, ReactNode, useReducer } from 'react';
import { ActionMain } from 'types/mainProviderTypes';
import { DefaultRequestValue } from 'types/searchTypes';
import { reducer, State } from './mainReducer';

export const FIRST_PAGE = 1;

type MainProviderProps = {
  children: ReactNode;
};

interface ContextType {
  state: State;
  dispatchState: React.Dispatch<ActionMain>;
}

const initialState: State = {
  data: WRONG_HTTP_ANSWER,
  firstLoad: true,
  pageValue: {
    searchValue: DefaultRequestValue.INPUT,
    orientation: DefaultRequestValue.ORIENTATION,
    perPage: DefaultRequestValue.PER_PAGE,
    page: FIRST_PAGE,
  },
  cardValue: {},
};

export const MainContext = createContext<ContextType>({
  state: initialState,
  dispatchState: () => null,
});

const MainProvider: FC<MainProviderProps> = ({ children }): JSX.Element => {
  const [state, dispatchState] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider
      value={{
        state,
        dispatchState,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
