import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

export default function HomeLayout() {
    const scheme = useColorScheme() === "dark" ? "dark" : "light";

    const titleColor = colors[scheme].primary;


  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerLargeTitle: true,
          headerLargeTitleStyle: { fontFamily: fonts.bold, color: titleColor },
          headerTitleStyle: { fontFamily: fonts.semibold, color: titleColor },
        }}
      />
    </Stack>
  );
}
