import { useThemeColors } from "@/theme/useThemeColors";
import { Stack } from "expo-router";
import { Platform } from "react-native";


export default function AppLayout() {
  const colors = useThemeColors();


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="user/[username]"
        options={({ route }) => ({
          title: "",
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: Platform.OS === "ios",
          headerTintColor: colors.primary,

        })}
      />
      <Stack.Screen
        name="repo/[owner]/[name]"
        options={{
          title: "",
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: Platform.OS === "ios",
          headerTintColor: colors.primary,
        }}
      />
      <Stack.Screen
        name="about/[topic]"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
