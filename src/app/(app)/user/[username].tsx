import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Platform, Share, Text, View } from "react-native";

import { favoriteToggled, selectIsFavorite } from "@/features/users/store/favoritesSlice";
import { describeError } from "@/lib/github/errors";
import { useGetContributionsQuery, useGetUserQuery, useGetUserReposQuery } from "@/lib/github/githubApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";


import RepoLinkCard from "@/features/repos/components/RepoLinkCard";
import { selectRepoSort, sortChanged } from "@/features/repos/store/reposSlice";
import { sortRepos } from "@/features/repos/utils/sortRepos";
import UserProfileHeader from "@/features/users/components/UserProfileHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { useToolbarIcons, type ToolbarIconSpec } from "@/theme/useToolbarIcons";
import { useMemo } from "react";

const SORT_OPTIONS = [
    { key: "stars", label: "Estrelas" },
    { key: "forks", label: "Forks" },
    { key: "name", label: "Nome" },
    { key: "updated", label: "Atualização" },
] as const;

const TOOLBAR_ICONS = {
    stars: { sf: "star", md: "star" },
    forks: { sf: "tuningfork", md: "fork_right" },
    name: { sf: "textformat", md: "sort_by_alpha" },
    updated: { sf: "clock", md: "schedule" },
    share: { sf: "square.and.arrow.up", md: "share" },
    favorite: { sf: "bookmark", md: "bookmark" },
    favorited: { sf: "bookmark.fill", md: "bookmark_added" },
} satisfies Record<string, ToolbarIconSpec>;


export default function UserProfileScreen() {
    const colors = useThemeColors();
    const { username } = useLocalSearchParams<{ username: string }>();
    const { data: user, error, isLoading } = useGetUserQuery(username);
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector((state) => selectIsFavorite(state, username));
    const { data: contributions, isLoading: contributionsLoading } = useGetContributionsQuery(username);
    const { data: repos, isLoading: reposLoading, error: reposError } = useGetUserReposQuery(username);
    const sort = useAppSelector(selectRepoSort);
    const icons = useToolbarIcons(TOOLBAR_ICONS);
    const sortedRepos = useMemo(() => sortRepos(repos ?? [], sort), [repos, sort]);




    return (
        <>
            <Stack.Toolbar placement="right">
                <Stack.Toolbar.Menu
                    icon={icons[sort.key]}
                    title="Ordenar por"
                    tintColor={colors.primary}
                    accessibilityLabel="Ordenar repositórios"
                    separateBackground
                >
                    {SORT_OPTIONS.map(({ key, label }) => (
                        <Stack.Toolbar.MenuAction
                            key={key}
                            icon={icons[key]}
                            isOn={sort.key === key}
                            subtitle={sort.key === key ? (sort.direction === "desc" ? "Decrescente" : "Crescente") : undefined}
                            onPress={() => dispatch(sortChanged(key))}
                        >
                            {label}
                        </Stack.Toolbar.MenuAction>
                    ))}
                </Stack.Toolbar.Menu>

                <Stack.Toolbar.Button
                    icon={icons.share}
                    tintColor={colors.primary}
                    accessibilityLabel="Compartilhar perfil"
                    disabled={!user}
                    onPress={() => {
                        if (!user) return;
                        Share.share(
                            Platform.OS === "ios" ? { url: user.html_url } : { message: user.html_url },
                        );
                    }}
                />
                <Stack.Toolbar.Button
                    icon={isFavorite ? icons.favorited : icons.favorite}
                    tintColor={colors.primary}
                    accessibilityLabel={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
                    disabled={!user}
                    onPress={() => {
                        if (!user) return;
                        dispatch(favoriteToggled({ login: user.login, name: user.name, avatar_url: user.avatar_url }));
                    }}
                />
            </Stack.Toolbar>
            {user ? (
                <FlatList
                    contentInsetAdjustmentBehavior="automatic"
                    data={sortedRepos}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <RepoLinkCard repo={item} />}
                    contentContainerStyle={{ padding: 16, gap: 8 }}
                    ListHeaderComponent={<UserProfileHeader user={user} contributions={contributions} contributionsLoading={contributionsLoading} />}
                    ListEmptyComponent={
                        reposLoading ? null : (
                            <Text style={{ color: reposError ? colors.destructive : colors.mutedForeground, textAlign: "center", padding: 16 }}>
                                {reposError ? describeError(reposError) : "Nenhum repositório público"}
                            </Text>
                        )
                    }
                    ListFooterComponent={reposLoading ? <ActivityIndicator color={colors.primary} style={{ padding: 16 }} /> : null}
                />
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