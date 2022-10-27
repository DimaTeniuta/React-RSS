import { HttpData } from './generalTypes';

export enum MainReducer {
  DATA = 'data',
  FIRST_LOAD = 'firstLoad',
  PAGE_VALUE = 'pageValue',
}

export type ActionData = { type: MainReducer.DATA; payload: HttpData };
export type StateData = HttpData;

export type ActionFirsLoad = { type: MainReducer.FIRST_LOAD; payload: boolean };
export type StateFirstLoad = boolean;

export type PageValue = { searchValue: string; orientation: string; perPage: string; page: number };
export type ActionPageValue = { type: MainReducer.PAGE_VALUE; payload: PageValue };
export type StatePageValue = PageValue;
