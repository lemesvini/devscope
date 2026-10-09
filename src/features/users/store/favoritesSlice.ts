import type { GitHubUser } from "@/lib/github/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FavoriteUser = Pick<GitHubUser, "login" | "name" | "avatar_url">;

type FavoritesState = { users: FavoriteUser[] };

const initialState: FavoritesState = {
    users: [
        {
            login: "lemesvini",
            name: "Vinicius Lemes",
            avatar_url: "https://avatars.githubusercontent.com/u/167573109?v=4",
        },
    ],
};

const sameLogin = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        favoriteToggled(state, action: PayloadAction<FavoriteUser>) {
            const index = state.users.findIndex((user) => sameLogin(user.login, action.payload.login));
            if (index === -1) {
                state.users.unshift(action.payload);
            } else {
                state.users.splice(index, 1);
            }
        }
    },
    selectors: {
        selectFavorites: (state) => state.users,
        selectIsFavorite: (state, login: string) => state.users.some((user) => sameLogin(user.login, login)),
    }
})

export const { favoriteToggled } = favoritesSlice.actions;
export const { selectFavorites, selectIsFavorite } = favoritesSlice.selectors;
