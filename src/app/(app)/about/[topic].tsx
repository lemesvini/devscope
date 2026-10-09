import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import AboutTopicIcon from "@/features/about/components/AboutTopicIcon";
import { findAboutTopic } from "@/features/about/topics";
import ThemePicker from "@/features/settings/components/ThemePicker";
import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

export default function AboutTopicSheet() {
    const colors = useThemeColors();
    const { topic: key } = useLocalSearchParams<{ topic: string }>();
    const topic = findAboutTopic(key);

    if (!topic) {
        return (
            <View style={{ padding: 24 }}>
                <Text style={{ color: colors.mutedForeground, textAlign: "center" }}>Tópico não encontrado</Text>
            </View>
        );
    }

    return (
        <View style={{ padding: 24, paddingBottom: 40, gap: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <AboutTopicIcon icon={topic.icon} size={40} />
                <Text style={{ fontFamily: fonts.bold, fontSize: 22, color: colors.primary }}>{topic.title}</Text>
            </View>

            {topic.body.map((paragraph) => (
                <Text key={paragraph} style={{ fontSize: 16, lineHeight: 24, color: colors.secondaryForeground }}>
                    {paragraph}
                </Text>
            ))}

            {topic.items ? (
                <View style={{ gap: 10 }}>
                    {topic.items.map((item) => (
                        <View key={item} style={{ flexDirection: "row", gap: 10 }}>
                            <View style={{ width: 6, height: 6, borderRadius: 3, marginTop: 9, backgroundColor: colors.primary }} />
                            <Text style={{ flex: 1, fontSize: 15, lineHeight: 22, color: colors.secondaryForeground }}>{item}</Text>
                        </View>
                    ))}
                </View>
            ) : null}

            {topic.key === "theme" ? <ThemePicker /> : null}
        </View>
    );
}
