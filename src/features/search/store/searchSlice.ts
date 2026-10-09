import type { UserSearchSort } from "@/lib/github/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SearchSortKey = "best-match" | UserSearchSort;
export type SearchOrder = "asc" | "desc";
export type UserSearchFilter = { sort: SearchSortKey; order: SearchOrder };

const initialState: UserSearchFilter = { sort: "best-match", order: "desc" };

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    sortChanged(state, action: PayloadAction<SearchSortKey>) {
      if (state.sort === action.payload) {
        if (action.payload !== "best-match") state.order = state.order === "asc" ? "desc" : "asc";
        return;
      }
      state.sort = action.payload;
      state.order = "desc";
    },
  },
  selectors: {
    selectSearchFilter: (state) => state,
  },
});

export const { sortChanged } = searchSlice.actions;
export const { selectSearchFilter } = searchSlice.selectors;
