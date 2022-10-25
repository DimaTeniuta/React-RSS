import { ResultsData } from 'types/generalTypes';

export type ActionData = { type: 'add'; payload: ResultsData[] };
type StateData = ResultsData[];

export const reducerData = (state: StateData, action: ActionData): ResultsData[] => {
  switch (action.type) {
    case 'add':
      return action.payload;
    default:
      throw new Error();
  }
};

export type ActionSearch = { type: 'search'; payload: string };
type StateSearch = string;

export const reducerSearch = (state: StateSearch, action: ActionSearch): string => {
  switch (action.type) {
    case 'search':
      return action.payload;
    default:
      throw new Error();
  }
};
