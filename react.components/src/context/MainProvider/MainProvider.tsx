import React, { createContext, FC, ReactNode, useReducer } from 'react';
import { ResultsData } from 'types/generalTypes';
import { ActionData, ActionFirsLoad } from 'types/mainProviderTypes';
import { reducerData, reducerFirstLoad } from './reducer';

interface MainContext {
  data: ResultsData[];
  isFirstLoad: boolean;
  dispatchData?: React.Dispatch<ActionData>;
  dispatchFirstLoad?: React.Dispatch<ActionFirsLoad>;
}

export const MainContext = createContext<MainContext>({
  data: [],
  isFirstLoad: true,
});

const initialData: ResultsData[] = [];
const initialFirstLoad = true;

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [data, dispatchData] = useReducer(reducerData, initialData);
  const [isFirstLoad, dispatchFirstLoad] = useReducer(reducerFirstLoad, initialFirstLoad);
  return (
    <MainContext.Provider value={{ data, dispatchData, isFirstLoad, dispatchFirstLoad }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
