import { createApi } from '@reduxjs/toolkit/query/react';

import { githubBaseQuery } from './baseQuery';
import type { ContributionCalendar, ContributionDay, GitHubUser, Repo, RepoDetails, UserSearchResponse, UserSearchSort } from './types';

const segment = encodeURIComponent;

interface JogruberResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

function toWeeks(days: ContributionDay[]): ContributionCalendar["weeks"] {
  const offset = new Date(days[0].date).getUTCDay();
  const padded = [...Array<null>(offset).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: githubBaseQuery,
  endpoints: (build) => ({
    getUser: build.query<GitHubUser, string>({
      query: (username) => `users/${segment(username)}`,
    }),
    searchUsers: build.query<UserSearchResponse, { q: string; sort?: UserSearchSort; order?: "asc" | "desc" }>({
      query: ({ q, sort, order }) => ({
        url: "search/users",
        params: { q, sort, order, per_page: 30 },
      }),
    }),
    getUserRepos: build.query<Repo[], string>({
      query: (username) => ({
        url: `users/${segment(username)}/repos`,
        params: { per_page: 100 },
      }),
    }),
    getRepo: build.query<RepoDetails, { owner: string; name: string }>({
      query: ({ owner, name }) => `repos/${segment(owner)}/${segment(name)}`,
    }),
    getContributions: build.query<ContributionCalendar, string>({
      query: (username) =>
        `https://github-contributions-api.jogruber.de/v4/${segment(username)}?y=last`,
      transformResponse: (res: JogruberResponse) => ({
        total: res.total.lastYear ?? 0,
        weeks: toWeeks(res.contributions),
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useSearchUsersQuery,
  useGetUserReposQuery,
  useGetRepoQuery,
  useGetContributionsQuery,
} = githubApi;