import { useThemeColors } from "@/theme/useThemeColors";
import { Stack } from "expo-router";


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
          headerTransparent: true,
          headerTintColor: colors.primary,

        })}
      />
      <Stack.Screen
        name="repo/[owner]/[name]"
        options={{
          title: "",
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: true,
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
