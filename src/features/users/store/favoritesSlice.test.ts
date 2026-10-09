import { favoritesSlice, favoriteToggled, selectFavorites, selectIsFavorite, type FavoriteUser } from "./favoritesSlice";

const reducer = favoritesSlice.reducer;

const octocat: FavoriteUser = { login: "octocat", name: "The Octocat", avatar_url: "https://example.com/octocat.png" };
const torvalds: FavoriteUser = { login: "torvalds", name: "Linus Torvalds", avatar_url: "https://example.com/torvalds.png" };

const asRoot = (users: FavoriteUser[]) => ({ [favoritesSlice.reducerPath]: { users } });

describe("favoritesSlice", () => {
  it("adds a user to the top of the list", () => {
    const state = reducer({ users: [torvalds] }, favoriteToggled(octocat));
    expect(state.users).toEqual([octocat, torvalds]);
  });

  it("removes a user that is already saved", () => {
    const state = reducer({ users: [octocat, torvalds] }, favoriteToggled(octocat));
    expect(state.users).toEqual([torvalds]);
  });

  it("matches logins regardless of case", () => {
    const state = reducer({ users: [octocat] }, favoriteToggled({ ...octocat, login: "OctoCat" }));
    expect(state.users).toEqual([]);
  });

  it("selects the saved users", () => {
    expect(selectFavorites(asRoot([octocat]))).toEqual([octocat]);
  });

  it("checks whether a login is saved", () => {
    const root = asRoot([octocat]);
    expect(selectIsFavorite(root, "OCTOCAT")).toBe(true);
    expect(selectIsFavorite(root, "torvalds")).toBe(false);
  });
});
