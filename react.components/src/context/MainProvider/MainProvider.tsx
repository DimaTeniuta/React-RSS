import { WRONG_HTTP_ANSWER } from 'API/httpRequest';
import React, { createContext, FC, ReactNode, useReducer } from 'react';
import { HttpData } from 'types/generalTypes';
import { ActionData, ActionFirsLoad, ActionPageValue, PageValue } from 'types/mainProviderTypes';
import { DefaultRequestValue } from 'types/searchTypes';
import { reducerData, reducerFirstLoad, reducerPageValue } from './mainReducer';

export const FIRST_PAGE = 1;

interface MainContext {
  data: HttpData;
  isFirstLoad: boolean;
  pageValue?: PageValue;
  dispatchData?: React.Dispatch<ActionData>;
  dispatchFirstLoad?: React.Dispatch<ActionFirsLoad>;
  dispatchPageValue?: React.Dispatch<ActionPageValue>;
}

const initialData: HttpData = WRONG_HTTP_ANSWER;
const initialFirstLoad = true;
const initialPaginationValue: PageValue = {
  searchValue: DefaultRequestValue.INPUT,
  orientation: DefaultRequestValue.ORIENTATION,
  perPage: DefaultRequestValue.PER_PAGE,
  page: FIRST_PAGE,
};

export const MainContext = createContext<MainContext>({
  data: initialData,
  isFirstLoad: initialFirstLoad,
});

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [data, dispatchData] = useReducer(reducerData, initialData);
  const [isFirstLoad, dispatchFirstLoad] = useReducer(reducerFirstLoad, initialFirstLoad);
  const [pageValue, dispatchPageValue] = useReducer(reducerPageValue, initialPaginationValue);
  return (
    <MainContext.Provider
      value={{ data, dispatchData, isFirstLoad, dispatchFirstLoad, pageValue, dispatchPageValue }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
