import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
} from '@reduxjs/toolkit/query/react';

import { toApiError, type ApiError } from './errors';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.github.com/',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/vnd.github+json');
    return headers;
  },
});

export const githubBaseQuery: BaseQueryFn<string | FetchArgs, unknown, ApiError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) {
    return { error: toApiError(result.error, result.meta), meta: result.meta };
  }
  return { data: result.data, meta: result.meta };
};