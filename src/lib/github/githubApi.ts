import { createApi } from '@reduxjs/toolkit/query/react';

import { githubBaseQuery } from './baseQuery';
import type { GitHubUser, Repo, RepoDetails } from './types';

const segment = encodeURIComponent;

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: githubBaseQuery,
  endpoints: (build) => ({
    getUser: build.query<GitHubUser, string>({
      query: (username) => `users/${segment(username)}`,
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
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetUserReposQuery,
  useGetRepoQuery,
} = githubApi;