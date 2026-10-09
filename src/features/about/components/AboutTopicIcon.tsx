import { SymbolView } from "expo-symbols";
import { View } from "react-native";

import type { AboutTopic } from "@/features/about/topics";
import { useThemeColors } from "@/theme/useThemeColors";

type AboutTopicIconProps = { icon: AboutTopic["icon"]; size?: number };

export default function AboutTopicIcon({ icon, size = 44 }: AboutTopicIconProps) {
    const colors = useThemeColors();

    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size * 0.27,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.accent,
            }}
        >
            <SymbolView name={icon} size={size / 2} tintColor={colors.accentForeground} />
        </View>
    );
}
