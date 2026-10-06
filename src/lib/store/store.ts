import { configureStore } from '@reduxjs/toolkit';

import { reposSlice } from '@/features/repos/reposSlice';
import { githubApi } from '@/lib/github/githubApi';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    [reposSlice.reducerPath]: reposSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;