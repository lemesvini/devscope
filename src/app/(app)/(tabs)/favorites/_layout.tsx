import { Stack } from "expo-router";
import { Platform } from "react-native";

import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

export default function FavoritesLayout() {
  const colors = useThemeColors();

  const titleColor = colors.primary;
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Favoritos",
          headerLargeTitle: true,
          headerLargeTitleStyle: { fontFamily: fonts.bold, color: titleColor },
          headerTitleStyle: { fontFamily: fonts.semibold, color: titleColor },
          headerTransparent: Platform.OS === "ios",
        }}
      />
    </Stack>
  );
}
