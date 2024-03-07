import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userAPI } from './user/UserSlice';
import { profileAPI } from './profile/ProfileSlice';
import { portfolioAPI } from './portfolio/PortfolioSlice';
const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [portfolioAPI.reducerPath]: portfolioAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userAPI.middleware,
      profileAPI.middleware,
      portfolioAPI.middleware,
    ]),
});
