import { NativeTabs } from "expo-router/unstable-native-tabs";

import { useThemeColors } from "@/theme/useThemeColors";


export default function TabsLayout() {
    const colors = useThemeColors();

  return (
    <NativeTabs tintColor={colors.primary}>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label hidden>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="sun.horizon" md="wb_twilight" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <NativeTabs.Trigger.Label hidden>Busca</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorites">
        <NativeTabs.Trigger.Label hidden>Favoritos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="bookmark" md="bookmark" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
