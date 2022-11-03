import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';

const rootReducer = combineReducers({
  formReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatch = AppStoreType['dispatch'];
