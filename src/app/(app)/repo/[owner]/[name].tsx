import { Stack, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { ActivityIndicator, Platform, ScrollView, Share, Text, View } from "react-native";

import RepoOverview from "@/features/repos/components/RepoOverview";
import { describeError } from "@/lib/github/errors";
import { useGetRepoQuery } from "@/lib/github/githubApi";
import { useThemeColors } from "@/theme/useThemeColors";
import { useToolbarIcons, type ToolbarIconSpec } from "@/theme/useToolbarIcons";

const TOOLBAR_ICONS = {
    share: { sf: "square.and.arrow.up", md: "share" },
} satisfies Record<string, ToolbarIconSpec>;

export default function RepoDetailsScreen() {
    const colors = useThemeColors();
    const icons = useToolbarIcons(TOOLBAR_ICONS);
    const { owner, name } = useLocalSearchParams<{ owner: string; name: string }>();
    const { data: repo, error, isLoading } = useGetRepoQuery({ owner, name });

    return (
        <>
            <Stack.Toolbar placement="right">
                <Stack.Toolbar.Button
                    icon={require("@/assets/icons/github.png")}
                    tintColor={colors.primary}
                    accessibilityLabel="Abrir no GitHub"
                    disabled={!repo}
                    onPress={() => {
                        if (!repo) return;
                        WebBrowser.openBrowserAsync(repo.html_url);
                    }}
                    separateBackground
                />
                <Stack.Toolbar.Button
                    icon={icons.share}
                    tintColor={colors.primary}
                    accessibilityLabel="Compartilhar repositório"
                    disabled={!repo}
                    onPress={() => {
                        if (!repo) return;
                        Share.share(
                            Platform.OS === "ios" ? { url: repo.html_url } : { message: repo.html_url },
                        );
                    }}
                />
            </Stack.Toolbar>
            {repo ? (
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ padding: 16 }}
                >
                    <RepoOverview repo={repo} />
                </ScrollView>
            ) : (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
                    {isLoading ? <ActivityIndicator color={colors.primary} /> : null}
                    {error ? (
                        <Text style={{ color: colors.destructive, textAlign: "center" }}>{describeError(error)}</Text>
                    ) : null}
                </View>
            )}
        </>
    );
}
