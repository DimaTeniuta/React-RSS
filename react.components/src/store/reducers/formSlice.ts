import { FormData } from 'types/formTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  data: FormData[];
  file: string;
}

export const defaultFileName = 'defaultName';

const initialState: FormState = {
  data: [],
  file: defaultFileName,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addData(state, action: PayloadAction<FormData>) {
      state.data = [...state.data, action.payload];
    },
    setFile(state, action: PayloadAction<string>) {
      state.file = action.payload;
    },
  },
});

const formReducer = formSlice.reducer;

export default formReducer;
