const GITHUB_USERNAME = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export const isValidUsername = (value: string) => GITHUB_USERNAME.test(value.trim());