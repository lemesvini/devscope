import { SymbolView } from "expo-symbols";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import type { AboutTopic } from "@/features/about/topics";
import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

import AboutTopicIcon from "./AboutTopicIcon";

type AboutCardProps = { topic: AboutTopic };

export default function AboutCard({ topic }: AboutCardProps) {
    const colors = useThemeColors();

    return (
        <Link href={{ pathname: "/about/[topic]", params: { topic: topic.key } }} asChild>
            <Pressable
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                    padding: 16,
                    borderRadius: 16,
                    backgroundColor: colors.card,
                }}
            >
                <AboutTopicIcon icon={topic.icon} />
                <View style={{ flex: 1, gap: 4 }}>
                    <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.secondaryForeground }}>
                        {topic.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: colors.mutedForeground }} numberOfLines={2}>
                        {topic.summary}
                    </Text>
                </View>
                <SymbolView
                    name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }}
                    size={14}
                    tintColor={colors.mutedForeground}
                />
            </Pressable>
        </Link>
    );
}
