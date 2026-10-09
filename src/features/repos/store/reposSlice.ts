import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SortKey = 'stars' | 'forks' | 'name' | 'updated';
export type SortDirection = 'asc' | 'desc';
export type RepoSort = { key: SortKey; direction: SortDirection };

const initialState: RepoSort = { key: 'stars', direction: 'desc' };

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    sortChanged(state, action: PayloadAction<SortKey>) {
      if (state.key === action.payload) {
        state.direction = state.direction === 'asc' ? 'desc' : 'asc';
        return;
      }
      state.key = action.payload;
      state.direction = action.payload === 'name' ? 'asc' : 'desc';
    },
  },
  selectors: {
    selectRepoSort: (state) => state,
  },
});

export const { sortChanged } = reposSlice.actions;
export const { selectRepoSort } = reposSlice.selectors;