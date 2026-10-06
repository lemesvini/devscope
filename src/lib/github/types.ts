export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  email: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  visibility: string;
  html_url: string;
  updated_at: string;
  owner: { login: string; avatar_url: string };
};

export type RepoDetails = Repo & {
  open_issues_count: number;
  subscribers_count: number;
  topics: string[];
};