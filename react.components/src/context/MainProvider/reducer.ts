import { ResultsData } from 'types/generalTypes';
import {
  ActionData,
  ActionFirsLoad,
  MainReducer,
  StateData,
  StateFirstLoad,
} from 'types/mainProviderTypes';

export const reducerData = (state: StateData, action: ActionData): ResultsData[] => {
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
