import { ResultsData } from './generalTypes';

export enum MainReducer {
  DATA = 'data',
  FIRST_LOAD = 'firstLoad',
}
export type ActionData = { type: MainReducer.DATA; payload: ResultsData[] };
export type StateData = ResultsData[];
export type ActionFirsLoad = { type: MainReducer.FIRST_LOAD; payload: boolean };
export type StateFirstLoad = boolean;
