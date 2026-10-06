import { colors } from "@/theme/colors";
import { Stack } from "expo-router";
import { ScrollView, useColorScheme } from "react-native";

export default function ProfileScreen() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon={"gear"}
          onPress={() => { }}
          tintColor={colors[scheme].primary}
        />
      </Stack.Toolbar>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* <View>
            <Text>Hello world!</Text>
        </View> */}
      </ScrollView>
    </>
  );
}
