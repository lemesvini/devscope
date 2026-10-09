import { Image } from "expo-image";
import { Text, View } from "react-native";

import type { GitHubUser } from "@/lib/github/types";
import { fonts } from "@/theme/fonts";
import { useThemeColors } from "@/theme/useThemeColors";

export type UserCardProps = {
    user: Pick<GitHubUser, "login" | "avatar_url"> & Partial<Pick<GitHubUser, "name" | "bio">>;
}

export default function UserCard({ user }: UserCardProps) {
    const colors = useThemeColors();

    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    borderRadius: 16,
                    backgroundColor: colors.card,
                    gap: 8,
                    paddingHorizontal: 10,

                }}
            >
                <Image
                    source={user.avatar_url}
                    style={{
                        width: 54,
                        height: 54,
                        backgroundColor: colors.muted,
                        borderRadius: 8
                    }}
                    contentFit="cover"
                    transition={200}
                    accessibilityIgnoresInvertColors
                />
                <View
                    style={{
                        flex: 1,
                        padding: 8,
                        gap: 4,
                        borderBottomColor: colors.border,
                        // borderBottomWidth: 1,
                    }}

                >
                    <Text
                        style={{
                            fontFamily: fonts.semibold,
                            fontSize: 16,
                            color: colors.mutedForeground
                        }}
                        numberOfLines={1}
                    >
                        {user.name ?? user.login}
                    </Text>
                    {user.name && user.name.toLowerCase() !== user.login.toLowerCase() ? (
                        <Text
                            style={{
                                fontSize: 14,
                                color: colors.mutedForeground
                            }}
                            numberOfLines={1}
                        >
                            {user.login}
                        </Text>
                    ) : null}
                    {user.bio ? (
                        <Text
                            style={{
                                fontSize: 14,
                                color: colors.mutedForeground
                            }}
                            numberOfLines={2}
                        >
                            {user.bio}
                        </Text>
                    ) : null}
                </View>
            </View>
        </>
    );
}