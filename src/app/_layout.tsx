import { navigationThemes } from "@/theme/colors";
import { fontAssets } from "@/theme/fonts";
import { useFonts } from "expo-font";
import { Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";

import { store } from "@/lib/store/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const [loaded, error] = useFonts(fontAssets);
useEffect(() => {
  if (loaded || error) SplashScreen.hideAsync();
}, [loaded, error]);
if (!loaded && !error) return null;

  return (
    <ThemeProvider value={navigationThemes[scheme]}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
    </ThemeProvider>
  );
}