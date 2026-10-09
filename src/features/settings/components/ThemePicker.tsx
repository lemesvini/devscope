import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Pressable, Text, View } from "react-native";

import { selectThemePreference, themeChanged, type ThemePreference } from "@/features/settings/store/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

type ThemeOption = { key: ThemePreference; label: string; icon: SymbolViewProps["name"] };

const OPTIONS: ThemeOption[] = [
    { key: "system", label: "Sistema", icon: { ios: "circle.lefthalf.filled", android: "contrast", web: "contrast" } },
    { key: "light", label: "Claro", icon: { ios: "sun.max", android: "light_mode", web: "light_mode" } },
    { key: "dark", label: "Escuro", icon: { ios: "moon", android: "dark_mode", web: "dark_mode" } },
];

export default function ThemePicker() {
    const colors = useThemeColors();
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectThemePreference);

    return (
        <View style={{ flexDirection: "row", gap: 8 }} accessibilityRole="radiogroup">
            {OPTIONS.map(({ key, label, icon }) => {
                const selected = theme === key;

                return (
                    <Pressable
                        key={key}
                        onPress={() => dispatch(themeChanged(key))}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selected }}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            gap: 8,
                            paddingVertical: 14,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: selected ? colors.accent : colors.card,
                        }}
                    >
                        <SymbolView name={icon} size={22} tintColor={selected ? colors.accentForeground : colors.mutedForeground} />
                        <Text
                            style={{
                                fontFamily: fonts.semibold,
                                fontSize: 13,
                                color: selected ? colors.accentForeground : colors.secondaryForeground,
                            }}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
