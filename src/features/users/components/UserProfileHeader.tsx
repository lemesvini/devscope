import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

import { ContributionCalendar, ContributionCalendarSkeleton } from "@/features/users/components/ContributionCalendar";
import type { ContributionCalendar as ContributionCalendarData, GitHubUser } from "@/lib/github/types";
import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

type UserProfileHeaderProps = {
    user: GitHubUser;
    contributions?: ContributionCalendarData;
    contributionsLoading?: boolean;
};

export default function UserProfileHeader({ user, contributions, contributionsLoading }: UserProfileHeaderProps) {
    const colors = useThemeColors();

    return (
        <View style={{ gap: 3, paddingBottom: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                <Image
                    source={user.avatar_url}
                    style={{ width: 60, height: 60, borderRadius: 6, backgroundColor: colors.muted }}
                    contentFit="cover"
                    transition={200}
                />
                <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.secondaryForeground }}>
                        {user.name ?? user.login}
                    </Text>
                    <Text style={{ color: colors.secondaryForeground }}>
                        {user.login}
                    </Text>

                    {user.email ? <Text style={{ color: colors.mutedForeground }}>{user.email}</Text> : null}
                </View>
            </View>
            <View style={{ gap: 16 }}>
                {contributions || contributionsLoading ? (
                    <View style={{ marginTop: 16 }}>
                        {contributions ? <ContributionCalendar calendar={contributions} /> : <ContributionCalendarSkeleton />}
                    </View>
                ) : null}
                {user.bio ? (
                    <Text style={{ color: colors.secondaryForeground, fontSize: 18 }}>
                        {user.bio}
                    </Text>
                ) : null}
                <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
                    <View style={{ display: "flex", flexDirection: "row", gap: 4, alignItems: "baseline" }}>
                        <Text style={{ color: colors.secondaryForeground, fontFamily: fonts.bold, fontSize: 18 }}>{user.following}</Text>
                        <Text style={{ color: colors.secondaryForeground }}>seguindo</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 4, alignItems: "baseline" }}>
                        <Text style={{ color: colors.secondaryForeground, fontFamily: fonts.bold, fontSize: 18 }}>{user.followers}</Text>
                        <Text style={{ color: colors.secondaryForeground }}>seguidores</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: -16, marginTop: 8, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                    <View
                        style={{
                            alignSelf: "flex-start",
                            marginLeft: 16,
                            marginBottom: -1,
                            paddingHorizontal: 4,
                            paddingVertical: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                            borderBottomWidth: 2,
                            borderBottomColor: colors.primary,
                        }}
                    >
                        <SymbolView
                            name={{ ios: "book.closed", android: "book", web: "book" }}
                            size={18}
                            tintColor={colors.mutedForeground}
                        />
                        <Text style={{ color: colors.secondaryForeground, fontSize: 16 }}>Repositórios</Text>
                        <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, backgroundColor: colors.muted }}>
                            <Text style={{ color: colors.secondaryForeground, fontSize: 13 }}>{user.public_repos}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
