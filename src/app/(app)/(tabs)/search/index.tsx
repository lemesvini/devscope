import { colors } from "@/theme/colors";
import { Stack } from "expo-router";
import { ScrollView, useColorScheme } from "react-native";

export default function SearchScreen() {
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
            {/* <Stack.Title>Search</Stack.Title> */}
            <Stack.SearchBar placement="automatic" placeholder="Search" onChangeText={() => { }} />
            <ScrollView>{/* Screen content */}</ScrollView>
        </>
    );
}
