import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

import { colors } from "@/theme/colors";


export default function TabsLayout() {
    const scheme = useColorScheme() === "dark" ? "dark" : "light";

  return (
    <NativeTabs tintColor={colors[scheme].primary}>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label hidden>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="sun.horizon" md="wb_twilight" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <NativeTabs.Trigger.Label hidden>Busca</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label hidden>Perfil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person" md="account_circle" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
