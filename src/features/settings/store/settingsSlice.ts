import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemePreference = "system" | "light" | "dark";

type SettingsState = { theme: ThemePreference };

const initialState: SettingsState = { theme: "system" };

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    themeChanged(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
  },
  selectors: {
    selectThemePreference: (state) => state.theme,
  },
});

export const { themeChanged } = settingsSlice.actions;
export const { selectThemePreference } = settingsSlice.selectors;
