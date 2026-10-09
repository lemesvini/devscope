import { selectSearchFilter, sortChanged } from "@/features/search/store/searchSlice";
import UserLinkCard from "@/features/users/components/UserLinkCard";
import { describeError } from "@/lib/github/errors";
import { useSearchUsersQuery } from "@/lib/github/githubApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useThemeColors } from "@/theme/useThemeColors";
import { useToolbarIcons, type ToolbarIconSpec } from "@/theme/useToolbarIcons";
import { skipToken } from "@reduxjs/toolkit/query";
import { Stack } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";

const SORT_OPTIONS = [
    { key: "best-match", label: "Relevância" },
    { key: "followers", label: "Seguidores" },
    { key: "repositories", label: "Repositórios" },
    { key: "joined", label: "Data de cadastro" },
] as const;

const TOOLBAR_ICONS = {
    "best-match": { sf: "sparkles", md: "auto_awesome" },
    followers: { sf: "person.2", md: "group" },
    repositories: { sf: "book.closed", md: "book" },
    joined: { sf: "calendar", md: "calendar_today" },
} satisfies Record<string, ToolbarIconSpec>;

export default function SearchScreen() {
    const colors = useThemeColors();
    const dispatch = useAppDispatch();
    const icons = useToolbarIcons(TOOLBAR_ICONS);
    const [searchQuery, setSearchQuery] = useState("");
    const [submitted, setSubmitted] = useState<string | null>(null);
    const { sort, order } = useAppSelector(selectSearchFilter);
    const { currentData, isFetching, error } = useSearchUsersQuery(
        submitted ? { q: submitted, sort: sort === "best-match" ? undefined : sort, order } : skipToken,
    );

    const emptyMessage = !submitted
        ? "Busque por nome ou login do GitHub"
        : error
            ? describeError(error)
            : `Nenhum usuário encontrado para "${submitted}"`;

    return (
        <>
            <Stack.Toolbar placement="right">
                <Stack.Toolbar.Menu
                    icon={icons[sort]}
                    title="Ordenar por"
                    tintColor={colors.primary}
                    accessibilityLabel="Ordenar resultados"
                >
                    {SORT_OPTIONS.map(({ key, label }) => (
                        <Stack.Toolbar.MenuAction
                            key={key}
                            icon={icons[key]}
                            isOn={sort === key}
                            subtitle={sort === key && key !== "best-match" ? (order === "desc" ? "Decrescente" : "Crescente") : undefined}
                            onPress={() => dispatch(sortChanged(key))}
                        >
                            {label}
                        </Stack.Toolbar.MenuAction>
                    ))}
                </Stack.Toolbar.Menu>
            </Stack.Toolbar>
            <Stack.SearchBar
                placement="automatic"
                placeholder="Usuário do GitHub"
                autoCapitalize="none"
                autoFocus={true}
                onChangeText={(e) => setSearchQuery(e.nativeEvent.text)}
                onSearchButtonPress={() => setSubmitted(searchQuery.trim())}
                onCancelButtonPress={() => {
                    setSearchQuery("");
                    setSubmitted(null);
                }}
            />

            <FlatList
                contentInsetAdjustmentBehavior="automatic"
                data={currentData?.items ?? []}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <UserLinkCard user={item} />}
                contentContainerStyle={{ padding: 16, gap: 8 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                ListEmptyComponent={
                    isFetching ? (
                        <ActivityIndicator color={colors.primary} style={{ padding: 16 }} />
                    ) : (
                        <Text style={{ color: error ? colors.destructive : colors.mutedForeground, textAlign: "center", padding: 16 }}>
                            {emptyMessage}
                        </Text>
                    )
                }
            />
        </>
    );
}
