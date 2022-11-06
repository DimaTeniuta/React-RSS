import { HttpData, ResultsData } from 'types/generalTypes';
import { ActionMain, MainReducer, PageValue } from 'types/mainProviderTypes';

export interface State {
  data: HttpData;
  firstLoad: boolean;
  pageValue: PageValue;
  cardValue: ResultsData;
}

export const reducer = (state: State, action: ActionMain): State => {
  switch (action.type) {
    case MainReducer.DATA:
      return { ...state, data: action.payload as HttpData };
    case MainReducer.FIRST_LOAD:
      return { ...state, firstLoad: action.payload as boolean };
    case MainReducer.PAGE_VALUE:
      return { ...state, pageValue: action.payload as PageValue };
    case MainReducer.CARD_PAGE:
      return { ...state, cardValue: action.payload as ResultsData };
    default:
      throw new Error('wrong type');
  }
};
