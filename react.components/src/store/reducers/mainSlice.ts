import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCards, WRONG_HTTP_ANSWER } from 'API/httpRequest';
import { FIRST_PAGE } from 'context/MainProvider/MainProvider';
import { HttpData, ResultsData } from 'types/generalTypes';
import { PageValue } from 'types/mainProviderTypes';
import { DefaultRequestValue } from 'types/searchTypes';

interface MainState {
  data: HttpData;
  isLoading: boolean;
  isFirstLoad: boolean;
  pageValue: PageValue;
  cardValue: ResultsData;
}

const initialState: MainState = {
  data: WRONG_HTTP_ANSWER,
  isFirstLoad: true,
  isLoading: false,
  pageValue: {
    searchValue: DefaultRequestValue.INPUT,
    orientation: DefaultRequestValue.ORIENTATION,
    perPage: DefaultRequestValue.PER_PAGE,
    page: FIRST_PAGE,
  },
  cardValue: {},
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setFirstLoad(state, action: PayloadAction<boolean>) {
      state.isFirstLoad = action.payload;
    },
    setPageValue(state, action: PayloadAction<PageValue>) {
      state.pageValue = action.payload;
    },
    setCardValue(state, action: PayloadAction<ResultsData>) {
      state.cardValue = action.payload;
    },
  },
  extraReducers: {
    [fetchCards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCards.fulfilled.type]: (state, action: PayloadAction<HttpData>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [fetchCards.rejected.type]: (state) => {
      state.isLoading = false;
      state.data = WRONG_HTTP_ANSWER;
    },
  },
});

const mainReducer = mainSlice.reducer;
export default mainReducer;
