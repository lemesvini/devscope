import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

export default function ProfileLayout() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";

  const titleColor = colors[scheme].primary;
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Meu Perfil",
          headerLargeTitle: true,
          headerLargeTitleStyle: { fontFamily: fonts.bold, color: titleColor },
          headerTitleStyle: { fontFamily: fonts.semibold, color: titleColor },
          headerTransparent: true,
          // headerBackground: () => (
          //   <Image
          //     source={require("@/assets/images/tutorial-web.png")}
          //     style={StyleSheet.absoluteFill}
          //     contentFit="cover"
          //   />
          // ),
        }}
      />
    </Stack>
  );
}
