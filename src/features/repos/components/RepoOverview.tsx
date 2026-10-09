import { Image } from "expo-image";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Text, View } from "react-native";

import type { RepoDetails } from "@/lib/github/types";
import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

type RepoOverviewProps = {
    repo: RepoDetails;
};

type RepoStatProps = {
    icon: SymbolViewProps["name"];
    value: number;
    label: string;
};

const formatCount = (value: number) => value.toLocaleString("pt-BR");

function RepoStat({ icon, value, label }: RepoStatProps) {
    const colors = useThemeColors();

    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <SymbolView name={icon} size={16} tintColor={colors.mutedForeground} />
            <Text style={{ color: colors.secondaryForeground, fontFamily: fonts.bold, fontSize: 16 }}>
                {formatCount(value)}
            </Text>
            <Text style={{ color: colors.secondaryForeground }}>{label}</Text>
        </View>
    );
}

export default function RepoOverview({ repo }: RepoOverviewProps) {
    const colors = useThemeColors();
    const updatedAt = new Date(repo.updated_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Image
                    source={repo.owner.avatar_url}
                    style={{ width: 24, height: 24, borderRadius: 40, backgroundColor: colors.muted }}
                    contentFit="cover"
                    transition={200}
                />
                <Text style={{ color: colors.mutedForeground }}>{repo.owner.login}  /  {repo.name}</Text>
            </View>

            <Text style={{ fontFamily: fonts.bold, fontSize: 30, color: colors.primary }}>
                {repo.name}
            </Text>

            {repo.description ? (
                <Text style={{ color: colors.secondaryForeground, fontSize: 18 }}>{repo.description}</Text>
            ) : (
                <Text style={{ color: colors.mutedForeground }}>Sem descrição</Text>
            )}

            {repo.topics.length > 0 ? (
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                    {repo.topics.map((topic) => (
                        <View
                            key={topic}
                            style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: colors.accent }}
                        >
                            <Text style={{ color: colors.accentForeground, fontSize: 13 }}>{topic}</Text>
                        </View>
                    ))}
                </View>
            ) : null}

            <View style={{ flexDirection: "row", flexWrap: "wrap", columnGap: 16, rowGap: 10 }}>
                <RepoStat icon={{ ios: "star", android: "star", web: "star" }} value={repo.stargazers_count} label="estrelas" />
                <RepoStat icon={{ ios: "tuningfork", android: "fork_right", web: "fork_right" }} value={repo.forks_count} label="forks" />
                <RepoStat icon={{ ios: "eye", android: "visibility", web: "visibility" }} value={repo.subscribers_count} label="observadores" />
                <RepoStat
                    icon={{ ios: "smallcircle.filled.circle", android: "adjust", web: "adjust" }}
                    value={repo.open_issues_count}
                    label="issues abertas"
                />
            </View>

            <View style={{ gap: 10, paddingVertical: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <SymbolView
                        name={{ ios: "chevron.left.forwardslash.chevron.right", android: "code", web: "code" }}
                        size={16}
                        tintColor={colors.mutedForeground}
                    />
                    <Text style={{ color: colors.secondaryForeground }}>{repo.language ?? "Linguagem não informada"}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <SymbolView name={{ ios: "clock", android: "schedule", web: "schedule" }} size={16} tintColor={colors.mutedForeground} />
                    <Text style={{ color: colors.secondaryForeground }}>Atualizado em {updatedAt}</Text>
                </View>
            </View>
        </View>
    );
}
