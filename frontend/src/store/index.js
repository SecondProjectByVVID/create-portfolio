import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userAPI } from './user/UserSlice';
import { profileAPI } from './profile/ProfileSlice';

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userAPI.middleware, profileAPI.middleware])
});
