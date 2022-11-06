import { ActionForm, FormReducer } from 'types/formProviderTypes';
import { FormData } from 'types/formTypes';

export interface FormState {
  file: File;
  data: FormData[];
}

export const reducerForm = (state: FormState, action: ActionForm): FormState => {
  switch (action.type) {
    case FormReducer.DATA:
      return { ...state, data: [...state.data, action.payload as FormData] };
    case FormReducer.FILE:
      return { ...state, file: action.payload as File };
    default:
      throw new Error('wrong type');
  }
};
