import { memo } from "react";
import { Text, View } from "react-native";

import type { Repo } from "@/lib/github/types";
import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

type RepoCardProps = { repo: Repo };

function RepoCard({ repo }: RepoCardProps) {
    const colors = useThemeColors();

    return (
        <View style={{ paddingVertical: 14, borderRadius: 16, gap: 6, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.foreground }} numberOfLines={1}>
                {repo.name}
            </Text>

            {repo.description ? (
                <Text style={{ fontSize: 14, color: colors.mutedForeground }} numberOfLines={2}>
                    {repo.description}
                </Text>
            ) : null}

            <View style={{ flexDirection: "row", gap: 16 }}>
                {repo.language ? <Text style={{ color: colors.mutedForeground }}>{repo.language}</Text> : null}
                <Text style={{ color: colors.mutedForeground }}>★ {repo.stargazers_count}</Text>
                <Text style={{ color: colors.mutedForeground }}>⑂ {repo.forks_count}</Text>
            </View>
        </View>
    );
}

export default memo(RepoCard);
