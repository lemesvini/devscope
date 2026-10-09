import type { RepoSort, SortKey } from "@/features/repos/store/reposSlice";
import type { Repo } from "@/lib/github/types";

const compare: Record<SortKey, (a: Repo, b: Repo) => number> = {
    stars: (a, b) => a.stargazers_count - b.stargazers_count,
    forks: (a, b) => a.forks_count - b.forks_count,
    name: (a, b) => a.name.localeCompare(b.name),
    updated: (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at),
};

export function sortRepos(repos: readonly Repo[], { key, direction }: RepoSort) {
    const sign = direction === "asc" ? 1 : -1;
    return [...repos].sort((a, b) => sign * compare[key](a, b));
}