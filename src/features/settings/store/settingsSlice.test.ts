import { configureStore } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

import { settingsListener } from "./settingsListener";
import { selectThemePreference, settingsSlice, themeChanged } from "./settingsSlice";

const createStore = () =>
  configureStore({
    reducer: { [settingsSlice.reducerPath]: settingsSlice.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(settingsListener.middleware),
  });

describe("settingsSlice", () => {
  const setColorScheme = jest.spyOn(Appearance, "setColorScheme").mockImplementation(() => {});

  afterEach(() => setColorScheme.mockClear());

  it("follows the system theme by default", () => {
    expect(selectThemePreference(createStore().getState())).toBe("system");
  });

  it("stores the chosen theme", () => {
    const store = createStore();
    store.dispatch(themeChanged("dark"));
    expect(selectThemePreference(store.getState())).toBe("dark");
  });

  it("applies the chosen theme to the app", () => {
    const store = createStore();
    store.dispatch(themeChanged("light"));
    expect(setColorScheme).toHaveBeenCalledWith("light");
  });

  it("returns control to the system theme", () => {
    const store = createStore();
    store.dispatch(themeChanged("system"));
    expect(setColorScheme).toHaveBeenCalledWith("unspecified");
  });
});
