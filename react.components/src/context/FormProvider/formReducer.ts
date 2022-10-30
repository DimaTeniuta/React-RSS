import { ActionFormData, ActionFormFile, FormReducer } from 'types/formProviderTypes';
import { FormData } from 'types/formTypes';

export const reducerFormData = (state: FormData[], action: ActionFormData): FormData[] => {
  switch (action.type) {
    case FormReducer.DATA:
      return [...state, action.payload];
    default:
      throw new Error('wrong type');
  }
};

export const reducerFormFile = (state: File, action: ActionFormFile): File => {
  switch (action.type) {
    case FormReducer.FILE:
      return action.payload;
    default:
      throw new Error('wrong type');
  }
};
