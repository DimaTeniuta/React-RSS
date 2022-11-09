import { FormData } from 'types/formTypes';
import { HttpData, ResultsData } from 'types/generalTypes';
import { ActionMain, MainReducer, PageValue } from 'types/mainProviderTypes';

export interface State {
  data: HttpData;
  file: File;
  formData: FormData[];
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
    case MainReducer.FORM_DATA:
      return { ...state, formData: [...state.formData, action.payload as FormData] };
    case MainReducer.FILE:
      return { ...state, file: action.payload as File };
    default:
      throw new Error('wrong type');
  }
};
