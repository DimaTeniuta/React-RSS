import { FormData } from './formTypes';
import { HttpData, ResultsData } from './generalTypes';

export enum MainReducer {
  DATA = 'data',
  FIRST_LOAD = 'firstLoad',
  PAGE_VALUE = 'pageValue',
  CARD_PAGE = 'cardPage',
  FORM_DATA = 'formData',
  FILE = 'file',
}

export type PageValue = { searchValue: string; orientation: string; perPage: string; page: number };
export type Payload = HttpData | boolean | PageValue | ResultsData | FormData | File;
export type ActionMain = { type: Partial<MainReducer>; payload: Partial<Payload> };
