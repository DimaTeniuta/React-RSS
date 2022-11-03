import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
import mainReducer from './reducers/mainSlice';

const rootReducer = combineReducers({
  formReducer,
  mainReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatch = AppStoreType['dispatch'];
