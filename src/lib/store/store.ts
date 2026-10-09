import { configureStore } from '@reduxjs/toolkit';

import { reposSlice } from '@/features/repos/store/reposSlice';
import { searchSlice } from '@/features/search/store/searchSlice';
import { settingsListener } from '@/features/settings/store/settingsListener';
import { settingsSlice } from '@/features/settings/store/settingsSlice';
import { favoritesSlice } from '@/features/users/store/favoritesSlice';
import { githubApi } from '@/lib/github/githubApi';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    [reposSlice.reducerPath]: reposSlice.reducer,
    [searchSlice.reducerPath]: searchSlice.reducer,
    [favoritesSlice.reducerPath]: favoritesSlice.reducer,
    [settingsSlice.reducerPath]: settingsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(settingsListener.middleware)
      .concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
