import type { Repo } from "@/lib/github/types";

import { sortRepos } from "./sortRepos";

const repo = (overrides: Partial<Repo>): Repo => ({
  id: 0,
  name: "repo",
  full_name: "user/repo",
  description: null,
  language: null,
  stargazers_count: 0,
  forks_count: 0,
  visibility: "public",
  html_url: "https://github.com/user/repo",
  updated_at: "2026-01-01T00:00:00Z",
  owner: { login: "user", avatar_url: "" },
  ...overrides,
});

const repos = [
  repo({ id: 1, name: "beta", stargazers_count: 10, forks_count: 5, updated_at: "2026-03-01T00:00:00Z" }),
  repo({ id: 2, name: "alpha", stargazers_count: 50, forks_count: 1, updated_at: "2026-01-01T00:00:00Z" }),
  repo({ id: 3, name: "gamma", stargazers_count: 30, forks_count: 9, updated_at: "2026-02-01T00:00:00Z" }),
];

const ids = (list: Repo[]) => list.map((item) => item.id);

describe("sortRepos", () => {
  it("sorts by stars in descending order", () => {
    expect(ids(sortRepos(repos, { key: "stars", direction: "desc" }))).toEqual([2, 3, 1]);
  });

  it("sorts by stars in ascending order", () => {
    expect(ids(sortRepos(repos, { key: "stars", direction: "asc" }))).toEqual([1, 3, 2]);
  });

  it("sorts by forks", () => {
    expect(ids(sortRepos(repos, { key: "forks", direction: "desc" }))).toEqual([3, 1, 2]);
  });

  it("sorts by name alphabetically", () => {
    expect(ids(sortRepos(repos, { key: "name", direction: "asc" }))).toEqual([2, 1, 3]);
  });

  it("sorts by last update", () => {
    expect(ids(sortRepos(repos, { key: "updated", direction: "desc" }))).toEqual([1, 3, 2]);
  });

  it("does not mutate the original list", () => {
    sortRepos(repos, { key: "stars", direction: "desc" });
    expect(ids(repos)).toEqual([1, 2, 3]);
  });
});
