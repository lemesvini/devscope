import { Stack } from "expo-router";

import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

export default function SearchLayout() {
  const colors = useThemeColors();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Busca",
          headerLargeTitle: true,
          headerLargeTitleStyle: { fontFamily: fonts.bold, color: colors.primary },
          headerTitleStyle: { fontFamily: fonts.semibold, color: colors.primary },
        }}
      />
    </Stack>
  );
}
