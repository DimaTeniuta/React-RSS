import { WRONG_HTTP_ANSWER } from 'API/httpRequest';
import React, { createContext, FC, ReactNode, useReducer } from 'react';
import { HttpData, ResultsData } from 'types/generalTypes';
import {
  ActionCardValue,
  ActionData,
  ActionFirsLoad,
  ActionPageValue,
  PageValue,
} from 'types/mainProviderTypes';
import { DefaultRequestValue } from 'types/searchTypes';
import { reducerCardValue, reducerData, reducerFirstLoad, reducerPageValue } from './mainReducer';

export const FIRST_PAGE = 1;

interface MainContext {
  data: HttpData;
  isFirstLoad: boolean;
  pageValue: PageValue;
  cardValue: ResultsData;
  dispatchData: React.Dispatch<ActionData>;
  dispatchFirstLoad: React.Dispatch<ActionFirsLoad>;
  dispatchPageValue: React.Dispatch<ActionPageValue>;
  dispatchCardValue: React.Dispatch<ActionCardValue>;
}

type MainProviderProps = {
  children: ReactNode;
};

const initialData: HttpData = WRONG_HTTP_ANSWER;
const initialFirstLoad = true;
const initialPaginationValue: PageValue = {
  searchValue: DefaultRequestValue.INPUT,
  orientation: DefaultRequestValue.ORIENTATION,
  perPage: DefaultRequestValue.PER_PAGE,
  page: FIRST_PAGE,
};
const initialCardValue = {};

export const MainContext = createContext<MainContext>({
  data: initialData,
  isFirstLoad: initialFirstLoad,
  cardValue: initialCardValue,
  pageValue: initialPaginationValue,
  dispatchData: () => null,
  dispatchFirstLoad: () => null,
  dispatchPageValue: () => null,
  dispatchCardValue: () => null,
});

const MainProvider: FC<MainProviderProps> = ({ children }): JSX.Element => {
  const [data, dispatchData] = useReducer(reducerData, initialData);
  const [isFirstLoad, dispatchFirstLoad] = useReducer(reducerFirstLoad, initialFirstLoad);
  const [pageValue, dispatchPageValue] = useReducer(reducerPageValue, initialPaginationValue);
  const [cardValue, dispatchCardValue] = useReducer(reducerCardValue, initialCardValue);

  return (
    <MainContext.Provider
      value={{
        data,
        dispatchData,
        isFirstLoad,
        dispatchFirstLoad,
        pageValue,
        dispatchPageValue,
        cardValue,
        dispatchCardValue,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
