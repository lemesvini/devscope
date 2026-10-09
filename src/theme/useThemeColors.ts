import { useColorScheme } from "react-native";

import { colors, type ColorScheme } from "./colors";

export function useColorSchemeName(): ColorScheme {
  return useColorScheme() === "dark" ? "dark" : "light";
}

export function useThemeColors() {
  return colors[useColorSchemeName()];
}
