import { createListenerMiddleware } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

import { themeChanged } from "./settingsSlice";

export const settingsListener = createListenerMiddleware();

settingsListener.startListening({
  actionCreator: themeChanged,
  effect: ({ payload }) => {
    Appearance.setColorScheme(payload === "system" ? "unspecified" : payload);
  },
});
