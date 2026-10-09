import { Link } from "expo-router";
import { memo } from "react";
import { Pressable } from "react-native";

import type { Repo } from "@/lib/github/types";

import RepoCard from "./RepoCard";

type RepoLinkCardProps = { repo: Repo };

function RepoLinkCard({ repo }: RepoLinkCardProps) {
    return (
        <Link
            href={{ pathname: "/repo/[owner]/[name]", params: { owner: repo.owner.login, name: repo.name } }}
            asChild
        >
            <Pressable>
                <RepoCard repo={repo} />
            </Pressable>
        </Link>
    );
}

export default memo(RepoLinkCard);
