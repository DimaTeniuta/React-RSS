import { FormState } from 'store/reducers/formSlice';
import { MainState } from 'store/reducers/mainSlice';

export const getMainReducer = (state: { formReducer: FormState; mainReducer: MainState }) =>
  state.mainReducer;

export const getFormReducer = (state: { formReducer: FormState; mainReducer: MainState }) =>
  state.formReducer;
