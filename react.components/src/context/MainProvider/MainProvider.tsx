import { WRONG_HTTP_ANSWER } from 'API/httpRequest';
import React, { createContext, FC, ReactNode, useReducer } from 'react';
import { FormData } from 'types/formTypes';
import { ActionMain } from 'types/mainProviderTypes';
import { DefaultRequestValue } from 'types/searchTypes';
import { reducer, State } from './mainReducer';

export const FIRST_PAGE = 1;

type MainProviderProps = {
  children: ReactNode;
};

export interface ContextType {
  state: State;
  dispatchState: React.Dispatch<ActionMain>;
}

export const defaultFileName = 'defaultName';

export const initialFormFile = new File(['start'], `${defaultFileName}.png`, { type: 'image/png' });
const initialFormData: FormData[] = [];

const initialState: State = {
  formData: initialFormData,
  data: WRONG_HTTP_ANSWER,
  file: initialFormFile,
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
