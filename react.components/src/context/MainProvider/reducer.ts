import { HttpData } from 'types/generalTypes';
import {
  ActionData,
  ActionFirsLoad,
  ActionPageValue,
  MainReducer,
  PageValue,
  StateData,
  StateFirstLoad,
  StatePageValue,
} from 'types/mainProviderTypes';

export const reducerData = (state: StateData, action: ActionData): HttpData => {
  switch (action.type) {
    case MainReducer.DATA:
      return action.payload;
    default:
      throw new Error();
  }
};

export const reducerFirstLoad = (state: StateFirstLoad, action: ActionFirsLoad): boolean => {
  switch (action.type) {
    case MainReducer.FIRST_LOAD:
      return action.payload;
    default:
      throw new Error();
  }
};

export const reducerPageValue = (state: StatePageValue, action: ActionPageValue): PageValue => {
  switch (action.type) {
    case MainReducer.PAGE_VALUE:
      return action.payload;
    default:
      throw new Error();
  }
};
