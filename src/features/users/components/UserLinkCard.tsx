import { Link } from "expo-router";
import { Pressable } from "react-native";

import UserCard, { type UserCardProps } from "./UserCard";

export default function UserLinkCard({ user }: UserCardProps) {
    return (
        <Link
            href={{ pathname: "/user/[username]", params: { username: user.login } }}
            asChild
        >
            <Pressable>
                <UserCard user={user} />
            </Pressable>
        </Link>
    );
}
