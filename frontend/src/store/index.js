import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userAPI } from './user/UserSlice';

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware)
});
