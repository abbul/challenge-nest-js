import { Favorite } from "./favorite";

export interface FavoriteApi {
    createFavorite(favorite: Favorite): Promise<void>;
    getFavorites(): Promise<Favorite[]>;
    getFavorite(username: string): Promise<Favorite | null>;
}