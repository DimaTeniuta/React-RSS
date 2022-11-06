import { HttpData, ResultsData } from './generalTypes';

export enum MainReducer {
  DATA = 'data',
  FIRST_LOAD = 'firstLoad',
  PAGE_VALUE = 'pageValue',
  CARD_PAGE = 'cardPage',
}

export type PageValue = { searchValue: string; orientation: string; perPage: string; page: number };
export type Payload = HttpData | boolean | PageValue | ResultsData;
export type ActionMain = { type: Partial<MainReducer>; payload: Partial<Payload> };
