import React, { createContext, FC, ReactNode, useReducer } from 'react';
import { ResultsData } from 'types/generalTypes';
import { ActionData, ActionSearch, reducerData, reducerSearch } from './reducer';

interface MainContext {
  data: ResultsData[];
  searchValue: string;
  dispatchData?: React.Dispatch<ActionData>;
  dispatchSearch?: React.Dispatch<ActionSearch>;
}

export const MainContext = createContext<MainContext>({
  data: [],
  searchValue: '',
});

const initialData: ResultsData[] = [];
const initialSearchValue = '';

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [data, dispatchData] = useReducer(reducerData, initialData);
  const [searchValue, dispatchSearch] = useReducer(reducerSearch, initialSearchValue);
  return (
    <MainContext.Provider value={{ data, dispatchData, searchValue, dispatchSearch }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
